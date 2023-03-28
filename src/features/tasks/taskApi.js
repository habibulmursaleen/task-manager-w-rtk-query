import { apiSlice } from "../api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
    }),
    getTask: builder.query({
      query: (id) => `/tasks/${id}`,
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //passimistic cache update
        try {
          const { data: task } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
              draft.push(task);
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    editTask: builder.mutation({
      query: ({ id, task }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: task,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //passimistic cache update
        try {
          const { data: task } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getTask", arg.id, (draft) => {
              return task;
            })
          );

          // updating the tasks list
          dispatch(
            apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
              return draft.map((item) => (item.id === task.id ? task : item));
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            return draft.filter((task) => task.id !== arg);
          })
        );
        //optimistic cache update
        try {
          await queryFulfilled;
        } catch (err) {
          setTimeout(function () {
            patchResult.undo();
          }, 2000); // 3000 milliseconds = 3 seconds
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetTaskQuery,
} = taskApi;
