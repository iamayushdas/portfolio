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
    {
      name: 'category',
      title: 'Skill Category',
      type: 'string',
      description: 'Category of the skill',
      options: {
        list: [
          { title: 'Frontend Development', value: 'frontend' },
          { title: 'Backend Development', value: 'backend' },
          { title: 'DevOps', value: 'devops' },
          { title: 'Testing', value: 'testing' },
          { title: 'Database', value: 'database' },
          { title: 'Other', value: 'other' },
        ],
      },
    },
  ],
}
