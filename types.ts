import React from 'react';

export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  company: string;
  logo?: string;
  description: string;
  skills: string[];
}

export interface Metric {
  label: string;
  value: string;
  icon: React.ElementType;
}

export interface Project {
  id: number;
  title: string;
  subtitle?: string; // Tagline curta
  category: string;
  status?: 'Completed' | 'In Progress' | 'MVP' | 'Maintenance';
  date?: string;
  image: string; // Cover Image
  gallery?: string[]; // Imagens adicionais
  description: string; // Descrição curta para o card
  problem?: string; // Contexto do negócio
  solution?: string; // Abordagem técnica
  impactMetrics?: Metric[]; // KPIs
  tags: string[];
  // Links específicos
  repoUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
  link?: string; // Fallback para compatibilidade
}

export interface Stat {
  label: string;
  value: string;
  icon: React.ElementType;
}

// Tipos para o Cluster de Habilidades (PT e EN para manter compatibilidade com cores)
export type SkillCategory = 
  | 'Engenharia de Dados' | 'Data Science & AI' | 'Analytics & Viz' | 'Estratégia & Soft Skills'
  | 'Data Engineering' | 'Data Science & AI (EN)' | 'Analytics & Viz (EN)' | 'Strategy & Soft Skills';

export interface SkillPoint {
  name: string;
  x: number; 
  y: number;
  z: number;
  category: SkillCategory;
}

export interface EducationItem {
  id: number;
  degree: string;      // Ex: Bacharelado em Sistemas de Informação
  institution: string; // Ex: USP, FIAP, etc
  year: string;        // Ex: 2018 - 2022
  status: 'Completed' | 'In Progress' | 'Planned';
  type: 'Bachelor' | 'MBA' | 'Master' | 'PhD' | 'Bootcamp'; // Para ícones/cores diferentes
  description?: string; // Opcional: TCC, Menção Honrosa, etc.
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
}

export interface LinkedinPost {
  id: number;
  embedUrl: string; // URL do iframe do LinkedIn
  title: string;    // Título interno para acessibilidade/referência
}

export type Language = 'pt' | 'en';