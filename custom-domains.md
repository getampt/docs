---
title: Add a Custom Domain
description: Learn how you to assign custom domain names to your Ampt applications.
---

By default, all instances on Ampt have a URL that ends with `.ampt.app`. You may want to replace this domain with a domain that you already own.

!!! note
Custom domain names can only be assised to **permanent stages**. You cannot set a custom domain for **developer sandboxes** or **preview environments**.
!!!

You’ll need to create a permanent stage by using the `ampt deploy` command from your terminal, running `deploy` from the Ampt interactive shell, or by creating a new stage in the dashboard.

There are two steps that you need to take to assign a custom domain to your stage:

1. Verify your ownership of the domain
2. Map the domain to the Ampt stage

## Verifying Custom Domain Ownership

To map a custom domain to your application, you must first prove ownership of the domain by adding a CNAME entry at your domain registrar. Follow the steps below to verify the ownership of the custom domain:

1. On the settings page of your stage, navigate to the "Domains" tab. You'll see a `*.ampt.app` domain assigned to this environment.
2. Click on "Add new domain" and enter the name of the domain name that you would like to assign in the dialog. Note that you can map subdomains following the steps here. See [our documentation](/docs/custom-domains#mapping-apex-domains) about apex domains.
3. You’ll see the first CNAME Name/Value pair that you use to prove the ownership of the custom domain. See in the image below the Name equals `_4453ae612288a32ae779be80e251735c.www.mydomain.com` while Value equals `_18cd929a9bd28592b7c824fa456bdbb4.bwzjrqdvsp.acm-validations.aws.`
4. Go into the DNS page of your domain registrar and add the CNAME there. Note that some registrars require you to provide the whole string for the Name, while others only need the hostname, `_4453ae612288a32ae779be80e251735c.www` in our example. GoDaddy, for example, warns you about this if you enter the whole string in the "Name" area. Google Domains also do not need the full domain, but they don't give a warning.
5. It may take a few minutes for your changes to propogate. You can click the "Refresh" button on the Ampt Dashboard to track the progress. After a few minutes, you’ll see that your ownership of the custom domain has been verified. Now we can continue to map our domain to our stage.

## Mapping a Custom Domain to an Ampt stage

Continue from the previous step by adding another CNAME record to your domain registrar.

This may take a few minutes for the DNS records to propogate and the mapping operation to finish. You can test the mapping by visiting the custom domain you selected. Please check your DNS records if the operation doesn't succeed or reach out to us for help.

## Mapping Apex Domains

An apex domain (a.k.a. naked domain) is a domain without a subdomain, for example `mydomain.com`.

Note that `www.mydomain.com` is still a subdomain and you can add it as documented above.

Apex domains can only be mapped to your Ampt stage if your DNS provider supports `ALIAS` records (also known as `A ALIAS` or `A NAME` records). See the below list of DNS providers that support `ALIAS` records.

- [AWS Route53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias.html)
- [ClouDNS](https://www.cloudns.net/wiki/article/18/)
- [DNSimple](https://support.dnsimple.com/articles/alias-record/)
- [NameCheap](https://www.namecheap.com/support/knowledgebase/article.aspx/9646/2237/how-to-create-a-cname-record-for-your-domain/)
- [NS1](https://help.ns1.com/hc/en-us/articles/360020248973)
