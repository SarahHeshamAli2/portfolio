import { groq } from "next-sanity";

export const personalInfoQuery = groq`
  *[_type == "personalInfo"][0]{
    fullName,
    headline,
    bio,
    "profileImageUrl": profileImage.asset->url,
    location,
    availability,
    skills
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(coalesce(orderRank, 9999) asc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    description,
    "coverImageUrl": coverImage.asset->url,
    techStack,
    projectUrl,
    repoUrl,
    featured,
    orderRank
  }
`;

export const experiencesQuery = groq`
  *[_type == "experience"] | order(coalesce(orderRank, 9999) asc, startDate desc){
    _id,
    role,
    company,
    location,
    startDate,
    endDate,
    isCurrent,
    summary,
    highlights,
    orderRank
  }
`;

export const contactQuery = groq`
  *[_type == "contactInfo"][0]{
    email,
    phone,
    contactFormEndpoint,
    socialLinks[]{
      _key,
      platform,
      url
    }
  }
`;
