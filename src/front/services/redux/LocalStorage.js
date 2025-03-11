// localStorage.js

 const loadState = () => {
    try {
      const serializedState = localStorage.getItem("reduxState");
      return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (error) {
      console.error("Could not load state from localStorage", error);
      return undefined;
    }
  };
  
   const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("reduxState", serializedState);
    } catch (error) {
      console.error("Could not save state to localStorage", error);
    }
  };

  export { loadState, saveState };
  