import { isIE, killIE } from '@/common/kill-ie';
import createFrontendApp from './main';

isIE ? killIE() : createFrontendApp();
