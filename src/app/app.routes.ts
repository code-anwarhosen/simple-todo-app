import { Routes } from '@angular/router';
import { Todo } from './pages/todo/todo';
import { NotFound } from './pages/not-found/not-found';
import { About } from './pages/about/about';

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
        path: 'about',
        component: About
    },
    {
        path: '**',
        component: NotFound
    }
];
