import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Auth } from '../models/auth.model'

// Section 2
export const ADD_AUTH       = '[AUTH] Add'
export const REMOVE_AUTH    = '[AUTH] Remove'

// Section 3
export class AddAuth implements Action {
    readonly type = ADD_AUTH

    constructor(public payload: Auth) {}
}

export class RemoveAuth implements Action {
    readonly type = REMOVE_AUTH
    // constructor(public payload: number) {}
}

// Section 4
export type Actions = AddAuth | RemoveAuth