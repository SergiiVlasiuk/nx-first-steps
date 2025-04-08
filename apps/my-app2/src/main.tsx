import { render } from 'solid-js/web';
import AppElement from './app/app.element';

const root = document.getElementById('root') as HTMLElement;

render(() => <AppElement />, root);