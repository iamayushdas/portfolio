import ImageUrlBuilder from "@sanity/image-url";
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

const builder = ImageUrlBuilder(client)

export function urlFor(source: any) {
    return builder.image(source);
}