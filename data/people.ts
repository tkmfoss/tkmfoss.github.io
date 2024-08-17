interface BaseMember {
  name: string;
  photo: string;
}

export type Member = BaseMember & { type: string };
export type Alumni = BaseMember & { year: number };

const LENGTH = 15;

export const MEMBERS_DATA: Member[] = new Array(LENGTH).fill(0).map((_, i) => {
  return {
    name: "Member " + i,
    type: "member",
    photo: "/images/profiles/person.avif",
  };
});

export const ALUMNI_DATA: Alumni[] = new Array(LENGTH).fill(0).map((_, i) => {
  return {
    name: "Alumni " + i,
    year: 2008 + i,
    photo: "/images/profiles/person.avif",
  };
});
