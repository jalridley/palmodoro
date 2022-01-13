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

    duration: 25,
    setDuration: duration =>
        set(state => ({
            ...state.duration,
            duration,
        })),

    untilBreak: 4,
    setUntilBreak: untilBreak =>
        set(state => ({
            ...state.untilBreak,
            untilBreak,
        })),

    breakDuration: 5,
    setBreakDuration: breakDuration =>
        set(state => ({
            ...state.breakDuration,
            breakDuration,
        })),
}));

export default useStore;
