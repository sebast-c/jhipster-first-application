import { type Ref, computed, defineComponent, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import TaskService from './task.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import JobService from '@/entities/job/job.service';
import { type IJob } from '@/shared/model/job.model';
import { type ITask, Task } from '@/shared/model/task.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'TaskUpdate',
  setup() {
    const taskService = inject('taskService', () => new TaskService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const task: Ref<ITask> = ref(new Task());

    const jobService = inject('jobService', () => new JobService());

    const jobs: Ref<IJob[]> = ref([]);
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveTask = async taskId => {
      try {
        const res = await taskService().find(taskId);
        task.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.taskId) {
      retrieveTask(route.params.taskId);
    }

    const initRelationships = () => {
      jobService()
        .retrieve()
        .then(res => {
          jobs.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      title: {},
      description: {},
      jobs: {},
    };
    const v$ = useVuelidate(validationRules, task as any);
    v$.value.$validate();

    return {
      taskService,
      alertService,
      task,
      previousState,
      isSaving,
      currentLanguage,
      jobs,
      v$,
      t$,
    };
  },
  created(): void {
    this.task.jobs = [];
  },
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.task.id) {
        this.taskService()
          .update(this.task)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('jhipsterFirstApplicationApp.task.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.taskService()
          .create(this.task)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('jhipsterFirstApplicationApp.task.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },

    getSelected(selectedVals, option, pkField = 'id'): any {
      if (selectedVals) {
        return selectedVals.find(value => option[pkField] === value[pkField]) ?? option;
      }
      return option;
    },
  },
});
