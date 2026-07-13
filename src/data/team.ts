/**
 * ============================================================
 *  EQUIPE — DADOS FICTÍCIOS PARA APRESENTAÇÃO DO PROTÓTIPO
 * ============================================================
 *  ⚠️ ATENÇÃO: nomes e funções abaixo são FICTÍCIOS, usados apenas
 *  para a cliente visualizar o site com aparência completa durante
 *  a apresentação do protótipo. NÃO publique estes dados como reais.
 *
 *  Antes da publicação definitiva, substitua por integrantes reais
 *  da equipe, incluindo apenas formações, registros e responsabilidade
 *  técnica REAIS e comprováveis. Não publicar certificados ou títulos
 *  sem validação. As fotos permanecem como placeholder até que fotos
 *  reais da equipe estejam disponíveis (não geramos rostos fictícios
 *  para representar pessoas reais da equipe).
 * ============================================================
 */

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
};

export const team: TeamMember[] = [
  {
    name: "Néia Ferreira",
    role: "Fundadora & responsável pelo atendimento",
    bio: "Idealizou o Espaço Néia com o objetivo de reunir estética avançada e acolhimento em um único endereço.",
  },
  {
    name: "Bianca Souza",
    role: "Esteticista — estética facial",
    bio: "Conduz os protocolos faciais com foco em cuidado individualizado e naturalidade.",
  },
  {
    name: "Rafaela Lima",
    role: "Esteticista — estética corporal",
    bio: "Especialista em protocolos de modelagem corporal e bem-estar.",
  },
];
