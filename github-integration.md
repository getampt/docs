---
title: Integrate with GitHub
description: Connect Ampt with your repositories on GitHub for seamless deployment workflows.
---

Ampt enables developers to seamlessly integrate their GitHub repositories with Ampt applications. This integration combines Ampt deployment workflows with your existing git workflow. Once the GitHub connection is established, you can automatically create preview environments for pull requests or trigger new deployments to a permanent stage by simply pushing code to a specific branch.

## Connecting GitHub with Ampt

To connect a GitHub repository to an Ampt application, you need to install the Ampt GitHub app in your GitHub account. Navigate to the “Settings” page of the application you want to connect, click the “Git” option, and then click "Link to GitHub" to install Ampt's GitHub app.

![Git Integration Settings](/images/docs/integrate-github.png 'Set up Git Integrations under the App Settings')

When you click the "Link to GitHub" button, you will be redirected to GitHub to install our app. You can grant access to all repositories or select specific repositories from your GitHub account. Note that you can modify these preferences at any time within your GitHub account. Upon completing the installation, you will be redirected back to the Ampt Dashboard. It may take a moment for all your repositories to appear.

## Linking a GitHub Repository to Your Ampt App

After connecting your GitHub account, you will see a list of repositories you've granted Ampt access to. To link a repository to your Ampt application, click the name of the repository and confirm your selection.

![Link Git Repository](/images/docs/git-link-repository.png 'Link a repository to your Ampt app')

## Settings and Configurations

Ampt allows you to customize settings related to your deployment workflows within each application. For added security, organization owners can disable deployments from outside of Git workflows. Developers will still be able to manually "share" preview environments, but they will not be able to "deploy" directly to a permanent stage. To disable deployments from other locations, uncheck "Allow CLI Deployments" under "Owner Settings."

If your Ampt project resides in a subdirectory within a repository, you can specify the path to your Ampt project using the “Root Path” field.

![Configure Settings](/images/docs/git-settings.png 'Configure git settings for your Ampt app')

## Enable Preview Environments

Ampt supports creating preview environments when a pull request is opened for a branch in the repository. You can configure multiple branches to trigger new preview environments for each pull request. This feature is particularly useful for independently reviewing each pull request in a production-like environment.

![Preview Branches](/images/docs/git-previews.png 'Enable previews on Pull Requests')

## Push to Deploy

To ensure that new deployments to the application occur as soon as code is pushed to the main branch, set up a "Push Deploy" connection. You will need to associate a branch with a stage to trigger a new deployment. Note that Ampt provides default "prod" and "dev" stage options to streamline the setup process, even if you haven't created stages with these names before.

![Push to Deploy](/images/docs/git-push-deploys.png 'Automatically deploy your application when changed are pushed')

You can create multiple "Push Deploy" connections for each app. Click "Save" to complete the process of linking a repository to your Ampt app. You will then be able to view the deployment logs for each stage individually in their respective "Deployments" tabs.
