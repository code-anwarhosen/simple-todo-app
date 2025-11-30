import { Routes } from '@angular/router';
import { Todo } from './pages/todo/todo';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Todo
    },
    {
        path: '**',
        component: NotFound
    }
];
