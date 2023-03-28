import { apiSlice } from "../api/apiSlice";

export const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeamMembers: builder.query({
      query: () => "/team",
    }),
  }),
});

export const { useGetTeamMembersQuery } = teamApi;
