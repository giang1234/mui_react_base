export interface ActionDialog {
    label: string,
    event: {
      type: string,
      url?: string,
      state?: string
    },
}
