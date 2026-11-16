# TEST PLAN

## Unit and Integration Focus
- Header renders navigation items
- Industry showcase changes selected content
- Main sections render expected visual content and CTA targets

## Acceptance Criteria
Given a desktop visitor
When the homepage loads
Then the page should present the hero, problem, platform, architecture, industry, AI, and contact sections in order.

Given a mobile visitor
When they open navigation
Then the mobile menu should expose section links and close after selection.

Given a buyer selects an industry
When they activate a different industry tab
Then the corresponding visual, telemetry list, and outcome should update.
