import packageJson from '../package.json';

export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('routineopsState');
      if (serializedState === null) {
        return undefined;
      }
      // Reset the state completely if the version number has changed
      if (packageJson !== localStorage.getItem('routineopsVersion')) {
        return undefined
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
      localStorage.setItem('routineopsVersion', packageJson.version);
    } catch (err) {
      // Ignore write errors.
   }
};