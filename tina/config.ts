import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: '',
  clientId: '',
  token: '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'page',
        label: 'Pages',
        path: 'content/pages',
        format: 'md',
        fields: [
          { type: 'string', name: 'title_en', label: 'Title (EN)', required: true },
          { type: 'string', name: 'title_es', label: 'Title (ES)', required: true },
          { type: 'string', name: 'meta_description_en', label: 'Meta Description (EN)' },
          { type: 'string', name: 'meta_description_es', label: 'Meta Description (ES)' },
          { type: 'string', name: 'hero_headline_en', label: 'Hero Headline (EN)' },
          { type: 'string', name: 'hero_headline_es', label: 'Hero Headline (ES)' },
          { type: 'string', name: 'hero_subheadline_en', label: 'Hero Subheadline (EN)' },
          { type: 'string', name: 'hero_subheadline_es', label: 'Hero Subheadline (ES)' },
          { type: 'rich-text', name: 'body_en', label: 'Body Content (EN)' },
          { type: 'rich-text', name: 'body_es', label: 'Body Content (ES)' },
        ],
      },
      {
        name: 'tournament',
        label: 'Tournaments',
        path: 'content/tournaments',
        format: 'md',
        fields: [
          { type: 'string', name: 'name', label: 'Event Name', required: true },
          { type: 'datetime', name: 'date', label: 'Event Date', required: true },
          { type: 'string', name: 'location', label: 'Location', required: true },
          { type: 'string', name: 'description_en', label: 'Description (EN)' },
          { type: 'string', name: 'description_es', label: 'Description (ES)' },
          { type: 'number', name: 'prize_pool', label: 'Prize Pool ($)' },
          { type: 'string', name: 'status', label: 'Registration Status', options: ['open', 'closed', 'coming_soon'] },
        ],
      },
      {
        name: 'trip',
        label: 'Trips',
        path: 'content/trips',
        format: 'md',
        fields: [
          { type: 'string', name: 'name', label: 'Package Name', required: true },
          { type: 'string', name: 'duration', label: 'Duration', required: true },
          { type: 'string', name: 'description_en', label: 'Description (EN)' },
          { type: 'string', name: 'description_es', label: 'Description (ES)' },
          { type: 'number', name: 'price', label: 'Price (per person)' },
          { type: 'string', name: 'inclusions', label: 'Inclusions', list: true },
          { type: 'boolean', name: 'available', label: 'Available' },
        ],
      },
      {
        name: 'sponsor',
        label: 'Sponsors',
        path: 'content/sponsors',
        format: 'md',
        fields: [
          { type: 'string', name: 'name', label: 'Sponsor Name', required: true },
          { type: 'string', name: 'tier', label: 'Tier', required: true, options: ['bronze', 'silver', 'gold', 'title'] },
          { type: 'string', name: 'description_en', label: 'Description (EN)' },
          { type: 'string', name: 'description_es', label: 'Description (ES)' },
          { type: 'image', name: 'logo', label: 'Logo' },
          { type: 'string', name: 'website', label: 'Website URL' },
        ],
      },
      {
        name: 'festival',
        label: 'Festival',
        path: 'content/festival',
        format: 'md',
        fields: [
          { type: 'string', name: 'title_en', label: 'Title (EN)', required: true },
          { type: 'string', name: 'title_es', label: 'Title (ES)', required: true },
          { type: 'datetime', name: 'date', label: 'Event Date' },
          { type: 'string', name: 'venue', label: 'Venue' },
          { type: 'string', name: 'venue_details_en', label: 'Venue Details (EN)' },
          { type: 'string', name: 'venue_details_es', label: 'Venue Details (ES)' },
          {
            type: 'object', name: 'schedule', label: 'Schedule Entries', list: true,
            fields: [
              { type: 'string', name: 'time', label: 'Time' },
              { type: 'string', name: 'activity_en', label: 'Activity (EN)' },
              { type: 'string', name: 'activity_es', label: 'Activity (ES)' },
            ],
          },
          { type: 'number', name: 'ticket_price', label: 'Ticket Price ($)' },
        ],
      },
      {
        name: 'team',
        label: 'Team Members',
        path: 'content/team',
        format: 'md',
        fields: [
          { type: 'string', name: 'name', label: 'Name', required: true },
          { type: 'string', name: 'role_en', label: 'Role (EN)', required: true },
          { type: 'string', name: 'role_es', label: 'Role (ES)', required: true },
          { type: 'rich-text', name: 'bio_en', label: 'Bio (EN)' },
          { type: 'rich-text', name: 'bio_es', label: 'Bio (ES)' },
          { type: 'image', name: 'photo', label: 'Photo' },
          {
            type: 'object', name: 'social', label: 'Social Links',
            fields: [
              { type: 'string', name: 'instagram', label: 'Instagram' },
              { type: 'string', name: 'facebook', label: 'Facebook' },
              { type: 'string', name: 'twitter', label: 'Twitter' },
            ],
          },
        ],
      },
    ],
  },
})
