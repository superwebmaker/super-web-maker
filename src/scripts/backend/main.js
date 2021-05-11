import { createApp } from 'vue';
import App from '@/backend/views/layouts/app';
import router from '@/backend/routes';
import http from '@/plugins/http';
import auth from '@/plugins/auth';
import BalmUI from 'balm-ui';
import BalmUIPlus from 'balm-ui-plus';
import validatorRules from '@/config/validator-rules';
import myStore from '@/backend/store';
// Ui pro
import FormView from '@/components/form-view';
import TableView from '@/components/table-view';
import DetailView from '@/components/detail-view';
// Form items
import InputText from '@/components/form-items/text';
import InputTextarea from '@/components/form-items/textarea';
import InputNumber from '@/components/form-items/number';
import InputSelect from '@/components/form-items/select';
import InputUploadImage from '@/components/form-items/upload-image';
import InputUploadFile from '@/components/form-items/upload-file';
import InputDatepicker from '@/components/form-items/datepicker';
import InputChips from '@/components/form-items/chips';
import InputSwitch from '@/components/form-items/switch';
import InputRadio from '@/components/form-items/radio';
import InputMultiSelect from '@/components/form-items/multi-select';

function createBackendApp() {
  const app = createApp(App);

  app.use(router);
  app.use(http);
  app.use(auth);
  app.use(BalmUI, {
    $store: myStore,
    $validator: validatorRules
  });
  app.use(BalmUIPlus);

  app.component(FormView.name, FormView);
  app.component(TableView.name, TableView);
  app.component(DetailView.name, DetailView);

  app.component(InputText.name, InputText);
  app.component(InputTextarea.name, InputTextarea);
  app.component(InputNumber.name, InputNumber);
  app.component(InputSelect.name, InputSelect);
  app.component(InputUploadImage.name, InputUploadImage);
  app.component(InputUploadFile.name, InputUploadFile);
  app.component(InputDatepicker.name, InputDatepicker);
  app.component(InputChips.name, InputChips);
  app.component(InputSwitch.name, InputSwitch);
  app.component(InputRadio.name, InputRadio);
  app.component(InputMultiSelect.name, InputMultiSelect);

  app.mount('#app');
}

export default createBackendApp;
