// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { winActions } from "readium-desktop/main/redux/actions";
import {
    IDictWinSessionReaderState,
} from "readium-desktop/main/redux/states/win/session/reader";

const initialState: IDictWinSessionReaderState = {};

export function winSessionReaderReducer(
    state: IDictWinSessionReaderState = initialState,
    action: winActions.session.registerReader.TAction |
        winActions.session.unregisterReader.TAction |
        winActions.session.setBound.TAction |
        winActions.session.setReduxState.TAction,
): IDictWinSessionReaderState {
    switch (action.type) {

        case winActions.session.registerReader.ID: {

            const id = action.payload.identifier;
            return {
                ...state,
                ...{
                    [id]: {
                        ...{
                            windowBound: action.payload.winBound,
                            reduxState: action.payload.reduxStateReader,
                        },
                        ...state[id],
                        ...{
                            browserWindowId: action.payload.win.id,
                            publicationIdentifier: action.payload.publicationIdentifier,
                            manifestUrl: action.payload.manifestUrl,
                            fileSystemPath: action.payload.filesystemPath,
                            identifier: id,
                        },
                    },
                },
            };
        }

        case winActions.session.unregisterReader.ID: {

            const id = action.payload.identifier;

            if (state[id]) {
                const ret = {
                    ...state,
                };
                delete ret[id];
                return ret;
            }
            break;
        }

        case winActions.session.setBound.ID: {

            const id = action.payload.identifier;

            if (state[id]) {
                return {
                    ...state,
                    ...{
                        [id]: {
                            ...state[id],
                            ...{
                                windowBound: action.payload.bound,
                            },
                        },
                    },
                };
            }
            break;
        }

        case winActions.session.setReduxState.ID: {

            const id = action.payload.identifier;

            if (state[id]) {
                return {
                    ...state,
                    ...{
                        [id]: {
                            ...state[id],
                            ...{
                                reduxState: action.payload.reduxState,
                            },
                        },
                    },
                };
            }
        }
    }

    return state;
}
