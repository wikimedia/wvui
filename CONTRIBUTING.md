# Contributing

We welcome contributions from everyone! WVUI is maintained by the Vue Migration Team of the
Wikimedia Foundation, and we like to encourage various ways to contribute, including task tracking
and discussion in Phabricator (our project management system), patch commits, and reviews.

## Table of contents {ignore=true}

<!--
    Markdown Preview Enhanced is used to automatically generate the table of contents. You don't
    have to use it but please leave these directives for those who choose to. It helps keeps the
    table of contents in sync.
-->
<!-- prettier-ignore-start -->
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

- [Author guidelines](#author-guidelines)
  - [Task tracking](#task-tracking)
  - [General guidelines](#general-guidelines)
  - [Patch requirements](#patch-requirements)
- [Reviewer guidelines](#reviewer-guidelines)
  - [General guidelines](#general-guidelines-1)
  - [Task tracking](#task-tracking-1)
- [How to stay up-to-date](#how-to-stay-up-to-date)

<!-- /code_chunk_output -->
<!-- prettier-ignore-end -->

## Author guidelines

### Task tracking

-   Patch authors should track their work via a Phabricator task on the
    [WVUI workboard](https://phabricator.wikimedia.org/project/view/4898/). If there is not already
    a task for the work you aim to complete, please add one.
-   Add or claim a task as soon as you decide to work on it. This will help avoid overlapping,
    duplicate, or out-of-order work. Keep the task in the appropriate column on the workboard.
-   Note that relatively minor contributions (like build asset updates or icon code optimizations)
    do not require a corresponding task
-   Before a component can be added to WVUI, it must have a complete entry in the
    [Wikimedia Design Style Guide](https://design.wikimedia.org/style-guide/index.html) (with the
    exception of a few pre-defined components that are unlikely to change much from their current
    OOUI implementation), and a go-ahead from the design team. See the WVUI column of the
    [UI component design inventory](https://phabricator.wikimedia.org/T277047) to check a
    component's status.
-   When tracking new components, developing the entire component to completely fulfill the criteria
    specified in the design style guide may be too much for a single patch. Consider creating an
    epic for that component with sub-tasks for the minimum viable solution and additional features.

### General guidelines

The expectations for submitting a patch are:

-   Write your best work.
-   Functional changes compile, run, and pass tests.
-   Established patterns, at least within the WVUI repository, are considered.
-   Any submitted change is an overall improvement. The rationale is that if a patch is an overall
    improvement, it's obvious to merge. If it's not, why should it be merged?
-   Smaller patches get better reviews.

### Patch requirements

Patch authors are required to do the following:

-   Update the [CHANGELOG](CHANGELOG.md) to describe the new work
-   For components:
    -   Include a story for each visual state of the component.
    -   Include a Jest snapshot for each visual state of the component.
    -   Add unit tests. Attempt to meet the established coverage threshold.
    -   Add documentation. Storybook automatically generates a docs tab that includes the
        component's documentation block, prop and event documentation, and stories. If there is
        anything else the end user should know, consider including it in the component documentation
        block.

## Reviewer guidelines

### General guidelines

-   The goal of code review is to help write great code, not only prevent bad code from being
    written. The distinction is that the former is helping to achieve whereas the latter is focused
    on prevention. Nourishing good ideas is better than extinguishing formative ideas.
-   Be specific when providing constructive feedback. Vague concerns, such as "there are many
    reasons" or "it's more nuanced than that," prevent further discussion and create invisible
    barriers to participation that cannot be overcome. Make your point and allow the author to
    address it. When possible, suggest an approach or reference with your request. The more clearly
    you express the changes you want, the easier it will be for the author to provide.
-   If you as a reviewer are making requests of the author, attempt to match their level of effort
    and timeliness. Everyone is busy and doing their best but differently abled.
-   Be open-minded. New ideas, especially standard ideas that are only new to you, are not
    inherently bad. It's ok to downvote to request improved documentation or clarification but not
    for an education in industry standard practice. You are responsible in part for creating the
    culture you want.

### Task tracking

To stay informed about parts of the work you might want to review or follow, you are encouraged to
subscribe to the corresponding Phabricator tasks so you will be alerted when the task changes
columns or has an associated patch opened.

## How to stay up-to-date

To keep all those interested in using or contributing to the library up-to-date on topics of design,
development, roadmaps, and releases, the Vue Migration Team will:

-   Include release notes with every release and send minor+ release summaries out to the following
    mailing lists:
    -   [wikitech-l](https://lists.wikimedia.org/mailman/listinfo/wikitech-l)
    -   [design.public](https://lists.wikimedia.org/mailman/listinfo/design)
-   Use the [WVUI workboard](https://phabricator.wikimedia.org/project/view/4898/) in Phabricator to
    publicly track the work, giving others the opportunity to subscribe to tasks, add comments, or
    claim tasks.
-   Fill out the Scrum of Scrums notes that go out to wikitech-l weekly.
