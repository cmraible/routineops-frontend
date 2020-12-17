export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('routineopsState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      // Ignore read errors
    }
};

export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('routineopsState', serializedState);
    } catch (err) {
      // Ignore write errors.
   }
};