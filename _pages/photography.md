---
layout: page
title: photography
permalink: /photography/
description: A collection of photos.
nav: true
nav_order: 5
images:
  lightbox2: true
---

<div class="photography">
{% if site.data.photography and site.data.photography.size > 0 %}
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {% for photo in site.data.photography %}
      <a href="{{ '/assets/img/photography/' | append: photo.image | relative_url }}" data-lightbox="photography" data-title="{{ photo.alt }}">
        <img
          src="{{ '/assets/img/photography/' | append: photo.image | relative_url }}"
          alt="{{ photo.alt }}"
          class="w-full aspect-square object-cover rounded-lg"
        />
      </a>
    {% endfor %}
  </div>
{% else %}
  <p>No photos yet — add entries to <code>_data/photography.yml</code> and drop the corresponding image files into <code>assets/img/photography/</code>.</p>
{% endif %}
</div>
