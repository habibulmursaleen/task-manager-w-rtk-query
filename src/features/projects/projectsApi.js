import { apiSlice } from "../api/apiSlice";

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjectList: builder.query({
      query: () => "/projects",
    }),
  }),
});

export const { useGetProjectListQuery } = projectsApi;
