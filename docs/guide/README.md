# Introduction

Vue Calendar Scheduler is a customizable calendar that allows you to display and create events with date, times and custom attributes.

## The Event model

An `Event` model is contained within the plugin to handle some under-the-hood logic **without filling the objects** provided by the developer with data they don't need.
Any object provided in the `[events]` prop of the calendar will be transformed to an `Event` instance.

To learn more about the `Event` model check the [Event model section](/guide/events.md).  

## Callbacks

The calendar provides a few callbacks for user interaction events, such as clicking a day, a time or an event.

Check the [callbacks section](/guide/callbacks.md) to learn more.

## Current Issues

- Because of the new Event model, new Events **can't be created without a `startTime`**. This will be fixed in the next release with the introduction of Event model validators.