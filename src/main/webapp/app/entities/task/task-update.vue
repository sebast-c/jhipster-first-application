<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate @submit.prevent="save()">
        <h2
          id="jhipsterFirstApplicationApp.task.home.createOrEditLabel"
          data-cy="TaskCreateUpdateHeading"
          v-text="t$('jhipsterFirstApplicationApp.task.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="task.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="task.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('jhipsterFirstApplicationApp.task.title')" for="task-title"></label>
            <input
              type="text"
              class="form-control"
              name="title"
              id="task-title"
              data-cy="title"
              :class="{ valid: !v$.title.$invalid, invalid: v$.title.$invalid }"
              v-model="v$.title.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('jhipsterFirstApplicationApp.task.description')" for="task-description"></label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="task-description"
              data-cy="description"
              :class="{ valid: !v$.description.$invalid, invalid: v$.description.$invalid }"
              v-model="v$.description.$model"
            />
          </div>
          <div class="form-group">
            <label v-text="t$('jhipsterFirstApplicationApp.task.job')" for="task-job"></label>
            <select
              class="form-control"
              id="task-jobs"
              data-cy="job"
              multiple
              name="job"
              v-if="task.jobs !== undefined"
              v-model="task.jobs"
            >
              <option :value="getSelected(task.jobs, jobOption, 'id')" v-for="jobOption in jobs" :key="jobOption.id">
                {{ jobOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" @click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.cancel')"></span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.save')"></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./task-update.component.ts"></script>
