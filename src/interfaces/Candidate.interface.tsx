// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    login: string;
    html_url: string;
    company: string | null;
    email: string | null;
    location: string | null;
    bio: string | null;
    avatar_url: string;
}