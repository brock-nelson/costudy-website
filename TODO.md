# CoStudy Website TODO

## High Priority - Before costudy.co Launch

### Google Analytics Integration
- [ ] Get Google Analytics GA4 Measurement ID for costudy.co domain
- [ ] Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` to environment variables
- [ ] Integrate GoogleAnalytics component in main layout
- [ ] Test GA tracking on staging/production
- [ ] Verify events are flowing to Google Analytics dashboard

**Note:** Skip GA for brocknelson.io. Only implement when moving to costudy.co domain.

---

## Future Enhancements

### Admin Portal
- [ ] Create "New Feature" form (`/admin/features/new`)
- [ ] Create "New Release" form (`/admin/releases/new`)
- [ ] Create "Edit Release" form (`/admin/releases/[id]/edit`)
- [ ] Add bulk actions for features (approve multiple, etc.)
- [ ] Export data functionality (CSV/Excel)
- [ ] Email notifications for new demo requests (requires SendGrid key)
- [ ] Advanced analytics filters (date ranges, event type filters)

### Marketing Site
- [ ] Connect demo form to API (`/api/demo`)
- [ ] Connect contact form to API (`/api/contact`)
- [ ] Newsletter subscription functionality
- [ ] Feature voting system for public users
- [ ] Public release notes/changelog page

### Infrastructure
- [ ] Merge with Henry's production database when ready
- [ ] Set up SendGrid email service (waiting on API key from partner)
- [ ] Add rate limiting to public forms
- [ ] Set up automated backups

---

## Completed ✅
- ✅ Database schema with all tables (Supabase)
- ✅ Authentication system (NextAuth + Redis sessions)
- ✅ Admin dashboard with stats
- ✅ Features management page
- ✅ Releases management page
- ✅ Analytics dashboard page
- ✅ API routes for admin actions
- ✅ Dark mode throughout
- ✅ Mobile responsive design
- ✅ Admin navigation
- ✅ Protected admin routes
