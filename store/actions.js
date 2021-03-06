import * as types from './mutation-types'

export const toggleSidebar = ({ commit }, opened) => commit(types.TOGGLE_SIDEBAR, opened)

export const toggleDevice = ({ commit }, device) => commit(types.TOGGLE_DEVICE, device)

export const expandMenu = ({ commit }, menuItem) => {
  if (menuItem) {
    menuItem.expanded = menuItem.expanded || false
    commit(types.EXPAND_MENU, menuItem)
  }
}

export const switchEffect = ({ commit }, effectItem) => {
  if (effectItem) {
    commit(types.SWITCH_EFFECT, effectItem)
  }
}
export const login = ({ commit }, data) => commit(types.LOGIN, data)

export const addCase = ({ commit }, data) => commit(types.ADD_CASE, data)

export const initData = ({ commit }, data) => commit(types.INIT_DATA, data)

export const refreshCase = ({ commit }, casedata) => commit(types.REFRESH_CASE, casedata)
