1. npx create-medusa-app@latest my-medusa-store
2. cd my-medusa-store
3. npx medusa user -e admin@medusajs.com -p supersecret



Problems:
1.Denied access to build-in tables. When creating foreign key relationships, we can't use ONUPDATE/ONDELETE CASCADE.
- Create Subscriber or Workflow