export default {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the experience',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'Company worked for',
    },
    {
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      description: 'Logo of the company',
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      description: 'Start date of the experience',
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'End date of the experience',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description of the experience',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Location of the experience',
    },
  ],
};
