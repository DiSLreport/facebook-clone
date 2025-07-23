import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useUserStore = create()(
    persist(
        (set)=>({
    userId:null, //user id starts at null, we update it later when user logs in
    userData:null,
    setUserId: (id, data = null) => set({userId:id,userData:data}),
    setUserData: (id,userData),
    clearUserId: () => set({userId:null}),
}),
{
    name:'user-storage',//name of item in storage, has to be unique (from zustand.docs)
    storage: createJSONStorage(() => sessionStorage),
},
    ),
)
export default useUserStore