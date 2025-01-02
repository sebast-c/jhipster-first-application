<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate @submit.prevent="save()">
        <h2
          id="jhipsterFirstApplicationApp.jobHistory.home.createOrEditLabel"
          data-cy="JobHistoryCreateUpdateHeading"
          v-text="t$('jhipsterFirstApplicationApp.jobHistory.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="jobHistory.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="jobHistory.id" readonly />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('jhipsterFirstApplicationApp.jobHistory.startDate')"
              for="job-history-startDate"
            ></label>
            <div class="d-flex">
              <input
                id="job-history-startDate"
                data-cy="startDate"
                type="datetime-local"
                class="form-control"
                name="startDate"
                :class="{ valid: !v$.startDate.$invalid, invalid: v$.startDate.$invalid }"
                :value="convertDateTimeFromServer(v$.startDate.$model)"
                @change="updateInstantField('startDate', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('jhipsterFirstApplicationApp.jobHistory.endDate')"
              for="job-history-endDate"
            ></label>
            <div class="d-flex">
              <input
                id="job-history-endDate"
                data-cy="endDate"
                type="datetime-local"
                class="form-control"
                name="endDate"
                :class="{ valid: !v$.endDate.$invalid, invalid: v$.endDate.$invalid }"
                :value="convertDateTimeFromServer(v$.endDate.$model)"
                @change="updateInstantField('endDate', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('jhipsterFirstApplicationApp.jobHistory.language')"
              for="job-history-language"
            ></label>
            <select
              class="form-control"
              name="language"
              :class="{ valid: !v$.language.$invalid, invalid: v$.language.$invalid }"
              v-model="v$.language.$model"
              id="job-history-language"
              data-cy="language"
            >
              <option
                v-for="language in languageValues"
                :key="language"
                :value="language"
                :label="t$('jhipsterFirstApplicationApp.Language.' + language)"
              >
                {{ language }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('jhipsterFirstApplicationApp.jobHistory.job')" for="job-history-job"></label>
            <select class="form-control" id="job-history-job" data-cy="job" name="job" v-model="jobHistory.job">
              <option :value="null"></option>
              <option
                :value="jobHistory.job && jobOption.id === jobHistory.job.id ? jobHistory.job : jobOption"
                v-for="jobOption in jobs"
                :key="jobOption.id"
              >
                {{ jobOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('jhipsterFirstApplicationApp.jobHistory.department')"
              for="job-history-department"
            ></label>
            <select class="form-control" id="job-history-department" data-cy="department" name="department" v-model="jobHistory.department">
              <option :value="null"></option>
              <option
                :value="
                  jobHistory.department && departmentOption.id === jobHistory.department.id ? jobHistory.department : departmentOption
                "
                v-for="departmentOption in departments"
                :key="departmentOption.id"
              >
                {{ departmentOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('jhipsterFirstApplicationApp.jobHistory.employee')"
              for="job-history-employee"
            ></label>
            <select class="form-control" id="job-history-employee" data-cy="employee" name="employee" v-model="jobHistory.employee">
              <option :value="null"></option>
              <option
                :value="jobHistory.employee && employeeOption.id === jobHistory.employee.id ? jobHistory.employee : employeeOption"
                v-for="employeeOption in employees"
                :key="employeeOption.id"
              >
                {{ employeeOption.id }}
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
<script lang="ts" src="./job-history-update.component.ts"></script>
