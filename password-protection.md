---
title: Password Protected Environments
description: Enforce authorized access to stage and preview environments.
---

Password Protection allows users to block public HTTP access to specific stage environments or preview environments. Environments with Password Protection enabled will present users attempting to access its public URL with a password form. If a valid password is entered, the URL will become fully accessible and behave normally until a configurable password expiration has been reached.

!!! note
This feature is intended for internal use to block access to development and preview environments. It **should not** be used as an end user authentication solution.
!!!

## Enabling Password Protection

Password Protection is only available to [Team plans](/pricing) and above. To enable Password Protection, navigate to your app in the [Ampt Dashboard](https://ampt.dev) and click the "Settings" tab at the top, then the "Password Protection" tab on the left. Click the "+" sign to open the following dialog box:

![Enable password protection dialog box](/images/docs/password-protection-create.png "Enable password protection")

The following options are available:

- **Password:** (required) Enter a password (up to 16 characters) that will be applied to all protected environments by default. Passwords can be overridden at the environment level.
- **Applied Environments:** Use the drop down to select existing environments that you want to protect. You can select as many stage and/or preview environments as you want.
- **Set for all Preview Environments:** Check this box if you want ALL new preview environments to automatically have password protection enabled.
- **Session Expiration:** Enter the amount of time (in seconds) that sessions should expire after. This defaults to 1 hour, but can be extended up to 1 year.

Click "Create" to apply the password protection.

!!! note
Password protection is applied at the CDN layer to prevent application abuse. This takes a few minutes to update and propagate. However, password protection will be applied to environments immediately using a fallback method to prevent unauthorized access while the infrastructure is updating.
!!!

## Managing Password Protection

Once Password Protection is enable, the settings page will display information about its current status.

![Manage password protection](/images/docs/password-protection-manage.png "Password Protection Enabled")

This will tell you how many environments it's applied to, whether or not it's enabled for all new preview environments, the current password, and which environments it has been applied to along with its status.

- Password Protection can be removed from individual environments by clicking the trash icon next to them.
- You can edit settings by clicking the three dot menu and selecting "EDIT".
- You can remove password protection from ALL environments by clicking the three dot menu and selecting "DELETE".

## Accessing Password Protected Environments

Password Protected environments will present users with the following password form:

![Password protection form](/images/docs/password-protection-form.png "Access to protected environments requires a password")

Entering the correct password will grant users access until the configured session expiration time.

## Overriding Environment Passwords

You can override the password for an environment by accessing its "Settings" page and clicking "Password Protection" in the left hand menu.

![Environment's password protection settings](/images/docs/password-protection-env.png "Manage an environment's password settings")

Click the three dot menu and select "EDIT" to open the password dialog. You can also delete password protection from this environment by clicking the "DELETE" option.

![Environment's password protection dialog](/images/docs/password-protection-env-edit.png "Override the inherited app password")

Once the password has been updated, click the "Override" button to save your changes.

## Propagating Password Updates

Updating a password, either at the app or environment level, will immediately invalidate any active logins. Since password updates require a modification to the CDN, it could take several minutes for the changes to apply and may prevent future logins until the process is complete.
