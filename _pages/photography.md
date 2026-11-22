---
layout: page
title: photography
permalink: /photography/
description: Some of my favorite moments, captured by my phone camera. Developing my skills as an amateur photographer!
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
  .photography-grid a,
  .photography-grid .photography-video {
    display: block;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    border-radius: 0.5rem;
  }
  .photography-grid img,
  .photography-grid video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

<div class="photography">
{% if site.data.photography and site.data.photography.size > 0 %}
  <div class="photography-grid">
    {% for item in site.data.photography %}
      {% if item.video %}
        <div class="photography-video">
          {% comment %} The source is attached by the script below only when the tile nears the viewport. {% endcomment %}
          <video
            controls
            muted
            playsinline
            preload="none"
            data-src="{{ item.video | url_encode | prepend: '/assets/video/photography/' | relative_url }}"
            {% if item.image %}poster="{{ item.image | url_encode | prepend: '/assets/img/photography/' | relative_url }}"{% endif %}
          ></video>
        </div>
      {% else %}
        {% assign photo_dir = '/assets/img/photography/' %}
        {% assign original = item.image | url_encode | prepend: photo_dir | relative_url %}
        {% assign ext = item.image | split: '.' | last | downcase %}
        {% if ext == 'jpg' or ext == 'jpeg' %}
          {% comment %}
            jekyll-imagemagick (enabled in _config.yml) writes <name>-480/800/1400.webp next to every
            .jpg/.jpeg at build time. The grid uses the small copies; the lightbox opens the 1400px one.
          {% endcomment %}
          {% assign stem = item.image | split: '.' | pop | join: '.' | url_encode %}
          {% assign webp_base = stem | prepend: photo_dir | relative_url %}
          <a href="{{ webp_base }}-1400.webp" data-lightbox="photography" data-title="{{ item.alt | escape }}">
            <img
              src="{{ webp_base }}-480.webp"
              srcset="{{ webp_base }}-480.webp 480w, {{ webp_base }}-800.webp 800w"
              sizes="(min-width: 768px) 25vw, (min-width: 576px) 33vw, 50vw"
              alt="{{ item.alt | escape }}"
              loading="{% if forloop.index <= 8 %}eager{% else %}lazy{% endif %}"
              decoding="async"
            >
          </a>
        {% else %}
          <a href="{{ original }}" data-lightbox="photography" data-title="{{ item.alt | escape }}">
            <img src="{{ original }}" alt="{{ item.alt | escape }}" loading="lazy" decoding="async">
          </a>
        {% endif %}
      {% endif %}
    {% endfor %}
  </div>
{% else %}
  <p>No photos yet — add entries to <code>_data/photography.yml</code> and drop the corresponding image files into <code>assets/img/photography/</code>.</p>
{% endif %}
</div>

<script>
  // Load each video only when its tile comes within ~300px of the viewport.
  (function () {
    var videos = document.querySelectorAll(".photography-video video[data-src]");
    function load(v) {
      if (v.src) return;
      v.src = v.getAttribute("data-src");
      v.preload = "metadata";
    }
    if (!("IntersectionObserver" in window)) {
      videos.forEach(load);
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            load(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "300px 0px" }
    );
    videos.forEach(function (v) {
      io.observe(v);
    });
  })();
</script>
