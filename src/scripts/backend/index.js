import { isIE, killIE } from '@/common/kill-ie';
import createBackendApp from './main';

isIE ? killIE() : createBackendApp();
