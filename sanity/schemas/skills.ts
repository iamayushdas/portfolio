export default {
  name: 'skills',
  title: 'Skills',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      description: 'Name of the skill',
    },
    {
      name: 'skillLogo',
      title: 'Skill Logo',
      type: 'image',
      description: 'Logo for the skill',
    },
  ],
}
