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

<style>
  .photography-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  @media (min-width: 576px) {
    .photography-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: 768px) {
    .photography-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  .photography-grid a {
    display: block;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    border-radius: 0.5rem;
  }
  .photography-grid img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

<div class="photography">
{% if site.data.photography and site.data.photography.size > 0 %}
  <div class="photography-grid">
    {% for photo in site.data.photography %}
      <a href="{{ '/assets/img/photography/' | append: photo.image | relative_url }}" data-lightbox="photography" data-title="{{ photo.alt }}">
        <img src="{{ '/assets/img/photography/' | append: photo.image | relative_url }}" alt="{{ photo.alt }}" />
      </a>
    {% endfor %}
  </div>
{% else %}
  <p>No photos yet — add entries to <code>_data/photography.yml</code> and drop the corresponding image files into <code>assets/img/photography/</code>.</p>
{% endif %}
</div>
