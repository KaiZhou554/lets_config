import type { Component } from 'vue'

export interface Phrase {
  label: string
  text: string
}

export interface Category {
  id: string
  name: string
  icon: Component
  phrases: Phrase[]
}
