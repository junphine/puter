/*
 * Copyright (C) 2024-present Puter Technologies Inc.
 *
 * This file is part of Puter.
 *
 * Puter is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import { Service } from '../definitions.js';
import UIElement from '../UI/UIElement.js';


// Import tab modules
import TabHome from '../UI/Dashboard/TabHome.js';
import TabApps from '../UI/Dashboard/TabApps.js';
import TabUsage from '../UI/Dashboard/TabUsage.js';
import TabAccount from '../UI/Dashboard/TabAccount.js';
import TabSecurity from '../UI/Dashboard/TabSecurity.js';
import UITabAbout from '../UI/Dashboard/UITabAbout.js';

// Registry of built-in tabs
const builtinTabs = [    
    TabUsage,
    TabAccount,
    TabSecurity,
    UITabAbout,
];


const TDashboardTab = use('ui.traits.TDashboardTab');

export class DashboardService extends Service {
    #top_tabs = [TabHome,TabApps];
    #tabs = [];
    async _init () {
        builtinTabs.forEach(tab => {
            this.register_tab(tab);
        });
    }
    get_top_tabs () {
        return this.#top_tabs;
    }
    get_tabs () {
        return this.#tabs;
    }
    register_tab (tab) {
        if ( tab instanceof UIElement ) {
            const ui_element = tab;
            tab = {
                ...ui_element.as(TDashboardTab).get_metadata(),
                reinitialize () {
                    ui_element.reinitialize();
                },
                get dom () {
                    return ui_element.root;
                },
            };
        }

        this.#tabs.push(tab);
    }
    register_top_tab (tab) {
        if ( tab instanceof UIElement ) {
            const ui_element = tab;
            tab = {
                ...ui_element.as(TDashboardTab).get_metadata(),
                reinitialize () {
                    ui_element.reinitialize();
                },
                get dom () {
                    return ui_element.root;
                },
            };
        }

        this.#top_tabs.push(tab);
    }
}
