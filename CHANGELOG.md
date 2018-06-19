# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Event dialog custom fields support:
    - Checkbox (Single, group)
    - Radio 
    - Select (Single, multiple)

- Event model validators.
- Event edition.
- Custom time picker, because default time picker varies from browser to browser and they all suck.
- Creation of recurring events.
- Drag to create.
- Drag and drop.

## [[0.7.4]](https://github.com/dapd007/v-calendar-scheduler/releases/tag/v0.7.4) - 2018-06-19
### Fixed
- Fixed a bug when a moment locale is set but the first day of week is monday. [PR #2](https://github.com/dapd007/v-calendar-scheduler/pull/2)
- Fixed a bug when the time is between xx:50 and xx:00. [PR #3](https://github.com/dapd007/v-calendar-scheduler/pull/3)

## [[0.7.3]](https://github.com/dapd007/v-calendar-scheduler/releases/tag/v0.7.3) - 2018-06-13
### Fixed
- Fixed a bug on all day events in Week view: events size are evaluated but it shouldn't. Thanks to [aguingand](https://github.com/dapd007/v-calendar-scheduler/pull/1).

## [[0.7.2]](https://github.com/dapd007/v-calendar-scheduler/releases/tag/v0.7.2) - 2018-05-30
### Fixed
- Vue events are now unbind on `beforeDestroy` so they don't trigger multiple times if the component is re-mounted. 

## [[0.7.1]](https://github.com/dapd007/v-calendar-scheduler/releases/tag/v0.7.1) - 2018-05-29
### Fixed
- Set Scss variables as `!default` to allow customization.


## [[0.7.0]](https://github.com/dapd007/v-calendar-scheduler/releases/tag/v0.7.0) - 2018-05-25
### Added
- New Event model for more control over Event properties.
- Basic times validation on model, **more complex validators coming soon**.
- New Event creation dialog:
    - Default fields: Date, Time Start and Time End.
    - Custom fields support: input (any html5 type) and textarea. **Extended support coming soon**.
- Event `displayText` callback/attribute.

### Issues
- Because of the new Event model, new Events **can't be created without a `startTime`**. This will be fixed in the next release with the introduction of Event model validators.

### Changed
- Events with a `startTime` now **require** a `endTime`.

## [[0.6.0]](https://github.com/dapd007/v-calendar-scheduler/releases/tag/v0.6.0) - 2018-05-22
### Added
- Events now span on 'Week' and 'Day' views.

## [[0.5.1]](https://github.com/dapd007/v-calendar-scheduler/releases/tag/v0.5.1) - 2018-05-19
### Added
- Initial release.
- Month view.
- Week view.
- Interaction events (Day clicked, Time Clicked, Event clicked).
- Default styles and variables.