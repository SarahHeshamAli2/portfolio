import { contactQuery, experiencesQuery, personalInfoQuery, projectsQuery } from "./queries";
import { hasSanityConfig, sanityClient } from "./sanity";
import type { ContactInfo, Experience, PersonalInfo, Project } from "./types";

const fallbackPersonalInfo: PersonalInfo = {
  fullName: "",
  headline: "",
  bio: "",
  profileImageUrl: undefined,
  location: undefined,
  availability: undefined,
  skills: [],
};

const fallbackContact: ContactInfo = {
  email: undefined,
  phone: undefined,
  contactFormEndpoint: undefined,
  socialLinks: [],
};

export async function getPersonalInfo() {
  if (!hasSanityConfig || !sanityClient) {
    return fallbackPersonalInfo;
  }

  const personalInfo = await sanityClient.fetch<PersonalInfo | null>(personalInfoQuery);
  return personalInfo ?? fallbackPersonalInfo;
}

export async function getProjects() {
  if (!hasSanityConfig || !sanityClient) {
    return [] as Project[];
  }

  const projects = await sanityClient.fetch<Project[] | null>(projectsQuery);
  return projects ?? [];
}

export async function getExperiences() {
  if (!hasSanityConfig || !sanityClient) {
    return [] as Experience[];
  }

  const experiences = await sanityClient.fetch<Experience[] | null>(experiencesQuery);
  return experiences ?? [];
}

export async function getContactInfo() {
  if (!hasSanityConfig || !sanityClient) {
    return fallbackContact;
  }

  const contact = await sanityClient.fetch<ContactInfo | null>(contactQuery);
  return contact ?? fallbackContact;
}

export async function getPortfolioContent() {
  if (!hasSanityConfig || !sanityClient) {
    return {
      personalInfo: fallbackPersonalInfo,
      projects: [] as Project[],
      experiences: [] as Experience[],
      contact: fallbackContact,
    };
  }

  const [personalInfo, projects, experiences, contact] = await Promise.all([
    getPersonalInfo(),
    getProjects(),
    getExperiences(),
    getContactInfo(),
  ]);

  return {
    personalInfo,
    projects,
    experiences,
    contact,
  };
}
