import create from 'zustand';

//zustand returns an object
//create state for menu user inputs
const useStore = create(set => ({
    goal: 12,
    setGoal: goal =>
        set(state => ({
            ...state.goal,
            goal,
        })),
}));

export default useStore;
