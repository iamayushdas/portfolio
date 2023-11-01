import { createClient } from "next-sanity";

const projectId= "xrt5fta3";
const dataset = "production";
const apiVersion = "2023-11-01"

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
})