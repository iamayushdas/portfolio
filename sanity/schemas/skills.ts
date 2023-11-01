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
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description of the skill or expertise',
    },
    {
      name: 'level',
      title: 'Level',
      type: 'number',
      description: 'Level of expertise in the skill (e.g., 1-5 or a percentage)',
    },
    {
      name: 'skillLogo',
      title: 'Skill Logo',
      type: 'image',
      description: 'Logo for the skill',
    },
  ],
}
