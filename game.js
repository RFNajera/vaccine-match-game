/* ============================================================
   Vaccine Match — Game Logic
   Sources: History of Vaccines (historyofvaccines.org),
            CIDRAP (cidrap.umn.edu), CHOP Vaccine Education Center,
            World Health Organization (who.int)
   ============================================================ */

'use strict';

// ──────────────────────────────────────────────────────────────
// 1. MASTER DATA — All vaccine-preventable disease pairs
// ──────────────────────────────────────────────────────────────
const ALL_PAIRS = [
  {
    id: 'smallpox',
    disease: 'Smallpox',
    vaccine: 'Smallpox Vaccine\n(Vaccinia)',
    vaccineName: 'Smallpox Vaccine (Vaccinia)',
    info: {
      diseaseName: 'Smallpox',
      preVaccine: 'Approximately 29,000 cases per year in the pre-vaccine United States. Globally, smallpox is estimated to have killed around 300 million people throughout history — more than all other infectious diseases combined.',
      postVaccine: 'Zero cases since 1980. The last natural case in the US occurred in 1949; the last case anywhere in the world was in Somalia in 1977. The WHO officially declared smallpox eradicated in 1980 — the only human disease ever eradicated by vaccination.',
      pathogen: '<strong>Causative agent:</strong> Variola major and Variola minor viruses (Orthopoxvirus genus). The virus only naturally infects humans.<br><br><strong>Transmission:</strong> Spread by large respiratory droplets from the mouth and throat during close contact (within ~6 feet). Rarely, transmission occurred via direct contact with skin lesions or contaminated items. The virus only spread after the rash appeared — unlike chickenpox.<br><br><strong>At risk:</strong> All unvaccinated individuals. Mortality was approximately 30% in unvaccinated persons. Survivors were often left with permanent facial scarring (pockmarks).',
      vaccineInfo: '<strong>History:</strong> Edward Jenner developed the first vaccine in 1796, building on the observation that milkmaids exposed to cowpox were protected from smallpox. This pioneering work launched the science of immunology. Routine vaccination in the US ended in 1972 once the disease was eliminated domestically. The subsequent global WHO eradication campaign concluded in 1980.<br><br><strong>Current vaccine:</strong> The Jynneos vaccine (approved 2019) uses a live, attenuated vaccinia virus that cannot replicate in humans and is given in two doses 28 days apart. It is used today primarily for protection against mpox (monkeypox).<br><br><strong>Safety:</strong> Jynneos causes mild injection-site reactions (redness, pain, itching) and occasionally fever, headache, or fatigue. The older ACAM2000 vaccine carries more significant risks including myocarditis and is held in reserve in the national stockpile.',
      sources: ['https://historyofvaccines.org', 'https://www.chop.edu/vaccine-education-center']
    }
  },
  {
    id: 'polio',
    disease: 'Poliomyelitis\n(Polio)',
    vaccine: 'Polio Vaccine\n(IPV / OPV)',
    vaccineName: 'Polio Vaccine (IPV/OPV)',
    info: {
      diseaseName: 'Poliomyelitis (Polio)',
      preVaccine: 'Before the Salk vaccine (1955), polio caused an estimated 16,000–58,000 cases of paralysis annually in the United States. The 1952 epidemic was the worst in US history, with nearly 58,000 cases and 3,145 deaths.',
      postVaccine: 'Zero wild poliovirus cases in the United States since 1979. Globally, wild poliovirus cases have fallen by >99.9% since 1988. As of 2025, wild polio type 1 circulates only in a handful of countries in South Asia.',
      pathogen: '<strong>Causative agent:</strong> Poliovirus, a member of the Enterovirus genus (Picornaviridae family). Three serotypes exist (types 1, 2, 3); types 2 and 3 have been eradicated.<br><br><strong>Transmission:</strong> Fecal-oral route (contaminated water/food) and less commonly by respiratory droplets. Most infections (95%) are asymptomatic; about 1 in 200 causes irreversible paralysis.<br><br><strong>At risk:</strong> Unvaccinated children under 5 are most vulnerable. The paralytic form ("acute flaccid paralysis") can permanently disable limbs and, in cases of bulbar polio, affect breathing.',
      vaccineInfo: '<strong>History:</strong> Jonas Salk introduced the inactivated polio vaccine (IPV) in 1955 following the largest clinical trial in history — involving 1.8 million children known as "Polio Pioneers." Albert Sabin developed the oral polio vaccine (OPV) licensed in 1961. The US switched exclusively to IPV in 2000 to eliminate rare vaccine-associated paralytic polio (VAPP) linked to OPV.<br><br><strong>Current vaccine:</strong> The inactivated poliovirus vaccine (IPV) is given as a four-dose series and provides long-lasting immunity without any risk of VAPP.<br><br><strong>Safety:</strong> IPV is considered among the safest vaccines available. Side effects are minor: soreness at the injection site, and occasionally mild fever. Serious adverse events are extremely rare.',
      sources: ['https://historyofvaccines.org', 'https://www.who.int', 'https://www.chop.edu/vaccine-education-center']
    }
  },
  {
    id: 'measles',
    disease: 'Measles',
    vaccine: 'MMR Vaccine',
    vaccineName: 'MMR Vaccine (Measles-Mumps-Rubella)',
    info: {
      diseaseName: 'Measles',
      preVaccine: 'Before the measles vaccine was licensed in 1963, the US reported approximately 530,000 cases per year — though the true burden was likely 3–4 million annually since most mild cases went unreported. About 400–500 people died each year, and 1,000 developed permanent brain damage.',
      postVaccine: 'After widespread vaccination, cases fell by more than 99%. Measles was declared eliminated from the US in 2000. However, outbreaks continue among unvaccinated communities. The WHO estimates that the measles vaccine has saved the most lives of any vaccine in the Expanded Programme on Immunization, preventing an estimated 60% of deaths averted since 1974.',
      pathogen: '<strong>Causative agent:</strong> Measles morbillivirus (Paramyxoviridae family). It is one of the most contagious pathogens known, with a basic reproduction number (R₀) of 12–18.<br><br><strong>Transmission:</strong> Airborne and droplet spread. The virus can remain infectious in the air or on surfaces for up to two hours after an infected person leaves the room.<br><br><strong>At risk:</strong> Unvaccinated individuals of all ages; infants too young to be vaccinated; immunocompromised persons. Measles can cause temporary immune amnesia — destroying immune memory cells — leaving survivors vulnerable to other infections for months or years.',
      vaccineInfo: '<strong>History:</strong> John Enders and colleagues grew the measles virus in the laboratory in 1954. John Franklin Enders, Thomas C. Peebles, and Thomas Weller developed the first measles vaccine; it was licensed in the US in 1963. The combined MMR vaccine (measles, mumps, rubella) was developed by Maurice Hilleman at Merck and licensed in 1971.<br><br><strong>Safety:</strong> MMR is highly safe. Common side effects include sore arm, mild rash, and low-grade fever 7–12 days post-vaccination. Febrile seizures occur in about 1 in 3,000 doses but are benign and self-limiting. The MMR vaccine does not cause autism — this claim originated from a 1998 paper that was retracted for fraud and numerous large-scale studies have found no link.',
      sources: ['https://historyofvaccines.org', 'https://www.chop.edu/vaccine-education-center', 'https://www.who.int']
    }
  },
  {
    id: 'mumps',
    disease: 'Mumps',
    vaccine: 'MMR Vaccine\n(Mumps component)',
    vaccineName: 'MMR Vaccine (Mumps component)',
    info: {
      diseaseName: 'Mumps',
      preVaccine: 'Before the mumps vaccine was introduced in 1967, approximately 162,000 cases were reported annually in the United States. Mumps was a leading cause of acquired deafness and a common cause of viral meningitis in children.',
      postVaccine: 'Cases declined by more than 99% after routine vaccination. In recent years, outbreaks have occurred in highly vaccinated populations, particularly on college campuses, demonstrating that two doses of MMR are more effective than one.',
      pathogen: '<strong>Causative agent:</strong> Mumps orthorubulavirus (Paramyxoviridae family).<br><br><strong>Transmission:</strong> Respiratory droplets and direct contact with saliva of an infected person. An infected person can spread the virus from 2 days before through 5 days after symptoms appear.<br><br><strong>At risk:</strong> Unvaccinated individuals. Complications include orchitis (inflammation of the testicles, affecting up to 30% of post-pubertal males — occasionally leading to reduced fertility), viral meningitis, oophoritis, pancreatitis, and permanent hearing loss.',
      vaccineInfo: '<strong>History:</strong> The mumps vaccine was developed by Maurice Hilleman, who used a virus sample from his ill daughter Jeryl Lynn in 1963. The Jeryl Lynn strain remains the basis for mumps vaccines used in North America today. The vaccine was licensed in 1967 and incorporated into the MMR combination vaccine in 1971.<br><br><strong>Safety:</strong> The mumps component of MMR is safe. Rarely, recipients develop mild, short-lived parotid gland swelling. Febrile seizures are a known but rare reaction to the MMR vaccine overall, not specifically the mumps component.',
      sources: ['https://historyofvaccines.org', 'https://www.chop.edu/vaccine-education-center']
    }
  },
  {
    id: 'rubella',
    disease: 'Rubella\n(German Measles)',
    vaccine: 'MMR Vaccine\n(Rubella component)',
    vaccineName: 'MMR Vaccine (Rubella component)',
    info: {
      diseaseName: 'Rubella (German Measles)',
      preVaccine: 'Before the rubella vaccine (1969), the US reported approximately 47,000 cases annually. A major 1964–65 rubella pandemic infected about 12.5 million Americans and caused approximately 11,000 miscarriages, 2,100 neonatal deaths, and 20,000 cases of congenital rubella syndrome (CRS) — resulting in blindness, deafness, heart defects, and intellectual disabilities.',
      postVaccine: 'Rubella was declared eliminated from the United States in 2004. In 2023, only 7 cases were reported. CRS has been reduced to near-zero in the US, though it remains a major cause of preventable birth defects globally.',
      pathogen: '<strong>Causative agent:</strong> Rubella virus (Matonaviridae family).<br><br><strong>Transmission:</strong> Respiratory droplets. Rubella is moderately contagious (R₀ ≈ 5–7). In adults and children, the disease is usually mild with rash and fever. The gravest danger is to pregnant women — the virus crosses the placenta and damages the developing fetal organs during the first trimester.<br><br><strong>At risk:</strong> Unvaccinated pregnant women and their fetuses are at highest risk. Infants born with CRS are a source of ongoing transmission.',
      vaccineInfo: '<strong>History:</strong> The rubella vaccine was developed by Harry Meyer and Paul Parkman at the NIH and licensed in 1969. Maurice Hilleman subsequently developed the strain used in the current MMR vaccine. Vaccination of women of childbearing age was prioritized because the primary public health goal was to prevent CRS.<br><br><strong>Safety:</strong> The rubella component of MMR is very safe. The most notable side effect is transient joint pain (arthralgia) occurring in about 25% of adult women vaccinated post-puberty, typically lasting one to three weeks. This is far less severe than the arthritis caused by natural rubella infection.',
      sources: ['https://historyofvaccines.org', 'https://www.chop.edu/vaccine-education-center', 'https://www.who.int']
    }
  },
  {
    id: 'diphtheria',
    disease: 'Diphtheria',
    vaccine: 'DTaP / Tdap\nVaccine',
    vaccineName: 'DTaP/Tdap Vaccine (Diphtheria component)',
    info: {
      diseaseName: 'Diphtheria',
      preVaccine: 'Before widespread vaccination in the 1920s–30s, diphtheria caused approximately 21,000 reported cases and 1,800 deaths per year in the United States. It was one of the leading killers of children, infamous for causing a leathery gray "pseudomembrane" in the throat that could asphyxiate victims.',
      postVaccine: 'Cases have declined by more than 99%. Fewer than 5 cases are now reported in the US most years. CHOP researchers estimated that diphtheria vaccination has prevented approximately 40 million cases in the United States since widespread use began.',
      pathogen: '<strong>Causative agent:</strong> <em>Corynebacterium diphtheriae</em> — a Gram-positive rod-shaped bacterium. Disease is caused by a potent exotoxin (diphtheria toxin) that inhibits protein synthesis in host cells, damaging the heart, nerves, and kidneys.<br><br><strong>Transmission:</strong> Respiratory droplets or direct contact with nasal or throat secretions. Also through skin (cutaneous diphtheria).<br><br><strong>At risk:</strong> Unvaccinated children and adults in under-vaccinated communities. Death can occur from airway obstruction or cardiac complications even in young, otherwise healthy patients.',
      vaccineInfo: '<strong>History:</strong> The diphtheria toxoid was developed in the 1920s following work by Emil von Behring (who won the first Nobel Prize in Physiology or Medicine in 1901 for diphtheria antitoxin research). Combination vaccines (DTP) including diphtheria, tetanus, and pertussis were introduced in the 1940s. The modern DTaP (acellular) vaccine replaced the older whole-cell DTP in the US in 1997, with significantly fewer side effects.<br><br><strong>Safety:</strong> DTaP is well tolerated. Common reactions include redness and soreness at the injection site, mild fever, and fussiness. Serious adverse events (e.g., severe allergic reactions) are extremely rare (less than 1 per million doses).',
      sources: ['https://historyofvaccines.org', 'https://www.chop.edu/vaccine-education-center']
    }
  },
  {
    id: 'tetanus',
    disease: 'Tetanus\n(Lockjaw)',
    vaccine: 'DTaP / Tdap\nVaccine',
    vaccineName: 'DTaP/Tdap Vaccine (Tetanus component)',
    info: {
      diseaseName: 'Tetanus (Lockjaw)',
      preVaccine: 'Before widespread vaccination, approximately 580 tetanus cases were reported annually in the US, with a case-fatality ratio of 25–60%. Tetanus was particularly deadly among newborns ("neonatal tetanus") in settings where umbilical cords were cut with unsterile instruments.',
      postVaccine: 'Cases have declined by more than 96%. The US now reports approximately 20–30 cases per year, almost exclusively in unvaccinated or under-vaccinated adults. Globally, the WHO estimates maternal and neonatal tetanus has been eliminated in over 40 countries through vaccination campaigns.',
      pathogen: '<strong>Causative agent:</strong> <em>Clostridium tetani</em> — a spore-forming anaerobic bacterium. Disease is caused by tetanospasmin, one of the most potent toxins known, which blocks neurotransmitter release and causes painful, uncontrolled muscle spasms ("lockjaw").<br><br><strong>Transmission:</strong> Tetanus is not contagious person-to-person. Spores in soil, dust, and animal feces enter the body through wounds, particularly deep puncture wounds, burns, or surgical sites.<br><br><strong>At risk:</strong> Unvaccinated individuals of all ages, especially in agriculture or outdoor settings. Adults who do not receive booster doses every 10 years are at increasing risk.',
      vaccineInfo: '<strong>History:</strong> The tetanus toxoid was developed in the 1920s-30s and used extensively in WWII, dramatically reducing tetanus deaths among Allied soldiers compared to WWI. Combined DTP vaccines were introduced in the US in 1948. Tdap (the booster formulation for adolescents and adults) was licensed in 2005. A Tdap dose is recommended for every pregnant woman during each pregnancy to protect newborns.<br><br><strong>Safety:</strong> Very safe. Common reactions: soreness, redness, and swelling at the injection site; mild fever; headache. The rare Arthus reaction (intense local hypersensitivity) can occur in adults who receive boosters too frequently.',
      sources: ['https://historyofvaccines.org', 'https://www.chop.edu/vaccine-education-center', 'https://www.who.int']
    }
  },
  {
    id: 'pertussis',
    disease: 'Pertussis\n(Whooping Cough)',
    vaccine: 'DTaP / Tdap\nVaccine',
    vaccineName: 'DTaP/Tdap Vaccine (Pertussis component)',
    info: {
      diseaseName: 'Pertussis (Whooping Cough)',
      preVaccine: 'Before widespread vaccination, the US reported approximately 200,000 cases and 9,000 deaths from pertussis annually. It was one of the leading causes of death in children under 5.',
      postVaccine: 'Cases declined by more than 98% following widespread vaccination in the 1940s. However, pertussis has resurged in recent decades due to waning immunity from the acellular vaccine and low vaccination rates. The US currently reports approximately 10,000–50,000 cases per year, with infants under 3 months — too young to be fully vaccinated — at highest risk for severe disease and death.',
      pathogen: '<strong>Causative agent:</strong> <em>Bordetella pertussis</em> — a highly contagious Gram-negative coccobacillus. Pertussis toxin damages the respiratory epithelium, causing paroxysmal coughing fits that can last weeks or months (the "100-day cough").<br><br><strong>Transmission:</strong> Highly contagious respiratory droplet spread; one of the most transmissible bacterial pathogens (R₀ = 12–17). Infected individuals are most contagious during the catarrhal (early runny nose) phase, before diagnosis is typically made.<br><br><strong>At risk:</strong> Infants under 6 months face the highest mortality. Most infant infections are acquired from parents or siblings who have waning immunity.',
      vaccineInfo: '<strong>History:</strong> The whole-cell pertussis vaccine was introduced in the 1940s combined with diphtheria and tetanus toxoids. Due to concerns about fever and rare neurological events associated with the whole-cell component, the US switched to the acellular pertussis vaccine (DTaP) in 1996–1997. Tdap was licensed in 2005 for adolescent and adult boosters. ACIP recommends Tdap for all pregnant women during each pregnancy to provide passive protection to newborns.<br><br><strong>Safety:</strong> DTaP is among the most studied vaccines. Common reactions: soreness at injection site (may be more pronounced after the 4th and 5th doses), mild fever, irritability, drowsiness. Serious reactions (fever >40.5°C, hypotonic-hyporesponsive episodes) are rare and not associated with lasting harm.',
      sources: ['https://historyofvaccines.org', 'https://www.chop.edu/vaccine-education-center', 'https://www.cidrap.umn.edu']
    }
  },
  {
    id: 'hepatitis_b',
    disease: 'Hepatitis B',
    vaccine: 'Hepatitis B\nVaccine (HBV)',
    vaccineName: 'Hepatitis B Vaccine (HBV)',
    info: {
      diseaseName: 'Hepatitis B',
      preVaccine: 'Before vaccination, the US reported approximately 66,000 acute symptomatic hepatitis B cases per year, with hundreds of thousands of additional asymptomatic infections. An estimated 1–1.4 million Americans had chronic hepatitis B infection, the primary driver of cirrhosis and liver cancer.',
      postVaccine: 'Cases of acute hepatitis B have declined by approximately 78%. In 2023, the US estimated ~14,000 new acute cases — though many infections remain unreported. Vaccination of infants beginning at birth has dramatically reduced the chronic carriage rate among vaccinated birth cohorts.',
      pathogen: '<strong>Causative agent:</strong> Hepatitis B virus (HBV), a member of the Hepadnaviridae family. HBV is 50–100 times more infectious than HIV when transmitted via needlestick.<br><br><strong>Transmission:</strong> Sexual contact, sharing needles, mother-to-child transmission at birth, needlestick injuries in healthcare settings, and contact with infectious blood or body fluids. HBV can survive outside the body on environmental surfaces for up to 7 days.<br><br><strong>At risk:</strong> Infants born to infected mothers; people with multiple sex partners; healthcare workers; people who inject drugs. Infants who acquire HBV at birth have a 90% chance of developing chronic infection; the risk falls to 5–10% in adults.',
      vaccineInfo: '<strong>History:</strong> Baruch Blumberg discovered the hepatitis B surface antigen (HBsAg) in 1965, a finding that earned him the Nobel Prize in 1976. The first hepatitis B vaccine, a plasma-derived product, was licensed in the US in 1981. In 1986, a recombinant DNA-based vaccine was licensed — the first vaccine produced using genetic engineering. Universal infant vaccination was recommended in 1991, and universal vaccination for unvaccinated adults was added in 2021.<br><br><strong>Safety:</strong> The recombinant HBV vaccine is very safe. Common reactions: soreness at injection site and low-grade fever. Serious adverse events are extremely rare. Long-term studies show protection lasting at least 30 years, and possibly lifelong immunity.',
      sources: ['https://historyofvaccines.org', 'https://www.chop.edu/vaccine-education-center', 'https://www.who.int']
    }
  },
  {
    id: 'hib',
    disease: 'Hib Disease\n(H. influenzae b)',
    vaccine: 'Hib Vaccine',
    vaccineName: 'Haemophilus influenzae type b (Hib) Vaccine',
    info: {
      diseaseName: 'Hib Disease (Haemophilus influenzae type b)',
      preVaccine: 'Before Hib vaccine introduction in the late 1980s, <em>H. influenzae</em> type b caused approximately 20,000 cases of serious invasive disease (meningitis, epiglottitis, sepsis) per year in children under 5 in the United States. It was the most common cause of bacterial meningitis in children and caused significant mortality and neurological disability.',
      postVaccine: 'Cases of invasive Hib disease in children under 5 have declined by more than 99%. Fewer than 200 cases are now reported annually in the US, mostly in unvaccinated or incompletely vaccinated children.',
      pathogen: '<strong>Causative agent:</strong> <em>Haemophilus influenzae</em> type b (Hib), a Gram-negative coccobacillus with a polysaccharide capsule. Despite its misleading name, Hib does not cause influenza — it was misidentified during the 1918 flu pandemic.<br><br><strong>Transmission:</strong> Respiratory droplets and direct contact with nasal secretions. Many children are asymptomatic carriers; invasive disease occurs when the bacterium crosses mucosal barriers into the bloodstream or central nervous system.<br><br><strong>At risk:</strong> Children under 5, especially infants 2–18 months. Asplenic individuals, Alaska Natives, Navajo, and Apache people historically had elevated rates of invasive Hib disease.',
      vaccineInfo: '<strong>History:</strong> Early polysaccharide-only Hib vaccines (licensed 1985) were poorly immunogenic in infants under 18 months. The breakthrough came with conjugation technology — attaching the Hib polysaccharide to a protein carrier — developed by John Robbins and Rachel Schneerson at the NIH. Conjugate Hib vaccines were licensed starting in 1987–1990 and transformed pediatric medicine, essentially eliminating pediatric Hib meningitis in the US within a decade.<br><br><strong>Safety:</strong> Hib conjugate vaccines are very well tolerated. Common reactions: mild redness and swelling at the injection site, occasionally mild fever. Serious adverse events are extremely rare.',
      sources: ['https://historyofvaccines.org', 'https://www.chop.edu/vaccine-education-center']
    }
  },
  {
    id: 'varicella',
    disease: 'Varicella\n(Chickenpox)',
    vaccine: 'Varicella\nVaccine (VZV)',
    vaccineName: 'Varicella Vaccine (Varivax)',
    info: {
      diseaseName: 'Varicella (Chickenpox)',
      preVaccine: 'Before the varicella vaccine was licensed in 1995, approximately 4 million cases, 10,500 hospitalizations, and 100–150 deaths occurred in the United States every year. Chickenpox was so common that it was considered an inevitable childhood rite of passage — but it was a leading cause of pediatric invasive group A streptococcal disease when skin lesions became infected.',
      postVaccine: 'Cases have declined by more than 99% in age groups targeted by vaccination. By the mid-2000s, after one-dose recommendations, hospitalizations fell by 88%. The switch to two doses in 2007 further reduced breakthrough cases. Currently fewer than 5,000 cases are reported annually in vaccinated populations.',
      pathogen: '<strong>Causative agent:</strong> Varicella-zoster virus (VZV), a herpesvirus. After primary infection (chickenpox), VZV establishes latency in dorsal root ganglia and can reactivate decades later to cause shingles (herpes zoster).<br><br><strong>Transmission:</strong> Among the most contagious respiratory pathogens — airborne spread and direct contact with skin lesions. A person is contagious 1–2 days before the rash and until all lesions crust over.<br><br><strong>At risk:</strong> Unvaccinated children and adults; immunocompromised individuals; pregnant women (risk of birth defects and maternal pneumonia); neonates born to mothers with no immunity.',
      vaccineInfo: '<strong>History:</strong> The Oka strain of live attenuated VZV was developed by Michiaki Takahashi in Japan in the early 1970s. It was licensed in Japan and Korea in 1986 and in the US in 1995. A combined MMRV vaccine (ProQuad) was licensed in 2005, allowing protection against four diseases in a single injection.<br><br><strong>Safety:</strong> The varicella vaccine is safe and effective. The most common side effects are mild soreness and redness at the injection site, and about 5–10% of vaccinees develop a mild varicella-like rash with a small number of lesions (these are rarely contagious). Very rarely, vaccinees can develop a mild form of shingles, but it is less common and less severe than shingles following natural infection.',
      sources: ['https://historyofvaccines.org', 'https://www.chop.edu/vaccine-education-center']
    }
  },
  {
    id: 'hepatitis_a',
    disease: 'Hepatitis A',
    vaccine: 'Hepatitis A\nVaccine (HAV)',
    vaccineName: 'Hepatitis A Vaccine (HAV)',
    info: {
      diseaseName: 'Hepatitis A',
      preVaccine: 'Before the hepatitis A vaccine was licensed in 1995, the US experienced approximately 117,000 reported cases annually; the true burden was estimated at 250,000+ infections per year. Outbreaks were common in childcare centers and from contaminated food supplies.',
      postVaccine: 'Cases declined by approximately 97% following vaccine introduction. The US now reports an estimated 3,300 new infections annually. However, hepatitis A resurgence among people experiencing homelessness and people who use drugs has caused large community outbreaks in recent years, highlighting the importance of broad adult vaccination.',
      pathogen: '<strong>Causative agent:</strong> Hepatitis A virus (HAV), a non-enveloped positive-sense single-stranded RNA virus in the Picornaviridae family.<br><br><strong>Transmission:</strong> Fecal-oral route — through contaminated food or water, or close contact with an infected person. Shellfish harvested from contaminated water and raw produce are common food vehicles. Unlike hepatitis B and C, hepatitis A does not cause chronic infection.<br><br><strong>At risk:</strong> Travelers to areas with poor sanitation; people who use injection and non-injection drugs; men who have sex with men; people experiencing homelessness; people with chronic liver disease (at risk for severe illness).',
      vaccineInfo: '<strong>History:</strong> Two inactivated hepatitis A vaccines were licensed in the US in 1995 (Havrix by GlaxoSmithKline) and 1996 (Vaqta by Merck). Universal vaccination of children was first recommended in 1999 for high-risk areas; universal childhood vaccination was expanded nationally in 2006. A combination hepatitis A-hepatitis B vaccine (Twinrix) is also available for adults.<br><br><strong>Safety:</strong> Hepatitis A vaccines are highly safe and well tolerated. Common reactions: soreness and warmth at the injection site. Serious adverse events are extremely rare. The two-dose series provides protection lasting at least 20 years, likely lifelong.',
      sources: ['https://historyofvaccines.org', 'https://www.chop.edu/vaccine-education-center', 'https://www.who.int']
    }
  },
  {
    id: 'rotavirus',
    disease: 'Rotavirus',
    vaccine: 'Rotavirus\nVaccine (RV)',
    vaccineName: 'Rotavirus Vaccine (RotaTeq / Rotarix)',
    info: {
      diseaseName: 'Rotavirus',
      preVaccine: 'Before rotavirus vaccines were introduced (2006), rotavirus was the leading cause of severe diarrheal disease in children under 5 worldwide. In the US, rotavirus caused approximately 55,000–70,000 hospitalizations and 20–60 deaths in children annually. Every child was infected at least once by age 5.',
      postVaccine: 'US rotavirus hospitalizations in children under 5 have declined by approximately 80% since vaccine introduction. Globally, rotavirus vaccines have prevented millions of childhood deaths, predominantly in low-income countries where dehydration from rotavirus gastroenteritis kills an estimated 200,000 children annually.',
      pathogen: '<strong>Causative agent:</strong> Rotavirus — a non-enveloped double-stranded RNA virus in the Reoviridae family. Multiple serotypes exist; group A rotavirus causes nearly all human disease. The virus is named for its distinctive wheel-like appearance under electron microscopy (rota = Latin for wheel).<br><br><strong>Transmission:</strong> Fecal-oral route; extremely small infectious dose (fewer than 10 viral particles). Highly resistant to environmental degradation, surviving on surfaces for days. Rotavirus can also spread via respiratory droplets.<br><br><strong>At risk:</strong> Children 3 months to 3 years are most vulnerable to severe disease; peak severity occurs at 6–24 months. The virus infects intestinal enterocytes, impairing fluid absorption and causing profuse watery diarrhea and vomiting.',
      vaccineInfo: '<strong>History:</strong> An early pentavalent rhesus rotavirus vaccine (RotaShield) was licensed in 1998 but withdrawn in 1999 after being linked to intussusception (a rare bowel obstruction) in approximately 1 per 10,000 vaccinees. Two new vaccines were developed and rigorously tested: RotaTeq (Merck, licensed 2006) and Rotarix (GSK, licensed 2008), which demonstrated excellent safety and efficacy without the intussusception signal of RotaShield.<br><br><strong>Safety:</strong> Both current vaccines are safe. A small increase in risk of intussusception (~1–2 per 100,000 vaccinees) has been detected, but this is far outweighed by the benefits. To minimize even this small risk, the first dose must be given before 15 weeks of age.',
      sources: ['https://historyofvaccines.org', 'https://www.chop.edu/vaccine-education-center', 'https://www.cidrap.umn.edu']
    }
  },
  {
    id: 'meningococcal',
    disease: 'Meningococcal\nDisease',
    vaccine: 'Meningococcal\nVaccine (MenACWY)',
    vaccineName: 'Meningococcal Vaccine (MenACWY / MenB)',
    info: {
      diseaseName: 'Meningococcal Disease',
      preVaccine: 'In the pre-vaccine era, approximately 2,600–3,000 cases of invasive meningococcal disease were reported annually in the United States. Meningococcal meningitis has a case-fatality ratio of 10–15% even with treatment; meningococcal septicemia is fatal in 25–40% of cases. Up to 20% of survivors experience permanent disability including hearing loss, limb amputations, and neurological injury.',
      postVaccine: 'Following the introduction of conjugate MenACWY vaccines and MenB vaccines, total invasive meningococcal disease has fallen to approximately 300 cases per year. College freshmen living in dormitories — historically a high-risk group — have seen the most dramatic declines.',
      pathogen: '<strong>Causative agent:</strong> <em>Neisseria meningitidis</em> — a Gram-negative encapsulated diplococcus. Multiple serogroups exist; serogroups B, C, and Y cause most disease in the US. Approximately 10–20% of healthy adults carry the bacterium asymptomatically in their nasopharynx.<br><br><strong>Transmission:</strong> Respiratory droplets and close or prolonged contact with an infected person. Living in close quarters (college dormitories, military barracks) greatly increases transmission risk.<br><br><strong>At risk:</strong> Children under 1 year old; adolescents and young adults (15–24); college freshmen living in dormitories; people with complement deficiencies or asplenia; travelers to the "meningitis belt" of sub-Saharan Africa.',
      vaccineInfo: '<strong>History:</strong> Meningococcal polysaccharide vaccines (for groups A and C) have been available since the 1970s. Conjugate meningococcal vaccines (MenACWY-D, Menactra) were licensed in the US in 2005, providing longer-lasting protection and herd immunity. Serogroup B meningococcal vaccines (Bexsero and Trumenba) were licensed in 2014–2015 following several campus outbreaks at Ivy League universities.<br><br><strong>Safety:</strong> Meningococcal vaccines are safe. Common side effects include soreness at the injection site and mild fever. Guillain-Barré syndrome was initially a concern for Menactra; post-licensure surveillance has not confirmed a causal relationship.',
      sources: ['https://historyofvaccines.org', 'https://www.chop.edu/vaccine-education-center', 'https://www.cidrap.umn.edu']
    }
  },
  {
    id: 'pneumococcal',
    disease: 'Pneumococcal\nDisease',
    vaccine: 'Pneumococcal\nVaccine (PCV)',
    vaccineName: 'Pneumococcal Conjugate Vaccine (PCV)',
    info: {
      diseaseName: 'Pneumococcal Disease',
      preVaccine: 'Before the introduction of the 7-valent pneumococcal conjugate vaccine (PCV7) in 2000, approximately 16,000 invasive pneumococcal disease cases occurred in children under 5 per year in the US, along with an estimated 40,000+ deaths from pneumococcal disease across all ages annually. <em>S. pneumoniae</em> was the leading cause of bacterial meningitis in children and a major cause of pneumonia, sepsis, and otitis media (ear infections).',
      postVaccine: 'Following introduction of PCV7 and subsequently PCV13 and PCV15/20, invasive pneumococcal disease in children under 5 declined by 93%. Due to herd protection, pneumococcal disease also declined substantially in unvaccinated elderly adults. However, non-vaccine serotypes continue to emerge, necessitating updated formulations.',
      pathogen: '<strong>Causative agent:</strong> <em>Streptococcus pneumoniae</em> (pneumococcus) — a Gram-positive, lancet-shaped diplococcus. Over 100 serotypes exist, defined by their polysaccharide capsules. The capsule is the major virulence factor, enabling evasion of phagocytosis.<br><br><strong>Transmission:</strong> Respiratory droplets and direct contact. Pneumococcal colonization of the upper respiratory tract is common (20–50% of children carry the bacterium asymptomatically); invasive disease occurs when host defenses are overwhelmed.<br><br><strong>At risk:</strong> Children under 2; adults 65+; persons with asplenia, sickle cell disease, cochlear implants, CSF leaks, or immunocompromising conditions.',
      vaccineInfo: '<strong>History:</strong> A 14-valent polysaccharide pneumococcal vaccine (PPSV14) was licensed in 1977 and an updated 23-valent polysaccharide vaccine (PPSV23) in 1983 for adults. The landmark advance was the conjugate vaccines: PCV7 was licensed in 2000, PCV13 in 2010, PCV15 in 2021, and PCV20 in 2021. Conjugate technology — pioneered by the same NIH team that developed Hib conjugate vaccines — enables infants to mount robust T-cell-dependent immune responses to polysaccharide antigens.<br><br><strong>Safety:</strong> PCV vaccines are very well tolerated. Common side effects: redness, tenderness, and swelling at injection site; mild fever and irritability in infants. Serious adverse events are extremely rare.',
      sources: ['https://historyofvaccines.org', 'https://www.chop.edu/vaccine-education-center', 'https://www.who.int']
    }
  },
  {
    id: 'hpv',
    disease: 'HPV\n(Human Papillomavirus)',
    vaccine: 'HPV Vaccine\n(Gardasil)',
    vaccineName: 'HPV Vaccine (Gardasil 9)',
    info: {
      diseaseName: 'HPV (Human Papillomavirus)',
      preVaccine: 'HPV is the most common sexually transmitted infection in the United States. Before vaccine introduction (2006), approximately 14 million new HPV infections occurred annually. HPV types 16 and 18 cause about 70% of cervical cancers, as well as cancers of the oropharynx, anus, vagina, vulva, and penis. HPV types 6 and 11 cause approximately 90% of genital warts.',
      postVaccine: 'Studies show a 64–88% reduction in vaccine-type HPV infections and cervical precancers in women who received the vaccine before first sexual exposure. Population-level data show a 90% reduction in vaccine-type HPV among teenage girls in countries with high vaccination rates. Early evidence suggests real-world reductions in invasive cervical cancer in vaccinated cohorts.',
      pathogen: '<strong>Causative agent:</strong> Human papillomavirus (HPV) — a double-stranded DNA virus in the Papillomaviridae family. More than 200 types are known; approximately 40 infect the anogenital tract. High-risk types (notably 16 and 18) integrate into host cell DNA, driving malignant transformation.<br><br><strong>Transmission:</strong> Direct skin-to-skin contact, primarily sexual. Most sexually active people will be infected with HPV at some point in their lives; most infections clear spontaneously, but persistent high-risk infections drive cancer development over years or decades.<br><br><strong>At risk:</strong> Sexually active individuals of all sexes. Immunocompromised persons have higher rates of persistent infection and malignancy. Harald zur Hausen won the Nobel Prize in 2008 for discovering that HPV causes cervical cancer.',
      vaccineInfo: '<strong>History:</strong> Ian Frazer and Jian Zhou developed the virus-like particle (VLP) technology underlying HPV vaccines at the University of Queensland. Gardasil (quadrivalent, types 6, 11, 16, 18) was licensed in the US in 2006 for females and 2009 for males. Gardasil 9 (nonavalent; covers types 6, 11, 16, 18, 31, 33, 45, 52, 58) was licensed in 2014. The ACIP recommends two doses for those vaccinated before age 15, and three doses for those starting at 15–26.<br><br><strong>Safety:</strong> Gardasil 9 is very safe. Common reactions: pain, redness, and swelling at injection site; dizziness or fainting (most common in adolescents — recommended to observe for 15 minutes post-vaccination). Serious adverse events are extremely rare. Large safety studies have not confirmed a causal link to conditions sometimes attributed to the vaccine in online misinformation.',
      sources: ['https://historyofvaccines.org', 'https://www.chop.edu/vaccine-education-center', 'https://www.who.int']
    }
  }
];

// ──────────────────────────────────────────────────────────────
// 2. GAME STATE
// ──────────────────────────────────────────────────────────────
const state = {
  selectedPairs: [],
  cards: [],
  flipped: [],      // indices of currently face-up unmatched cards
  matched: new Set(), // indices of matched cards
  timerInterval: null,
  seconds: 0,
  flipCount: 0,
  isLocked: false,  // prevent clicks during animation
  matchCount: 0,
  usedPairIds: new Set(), // track which pairs have been used across rounds
};

// ──────────────────────────────────────────────────────────────
// 3. DOM REFS
// ──────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

const screens = {
  start: $('screen-start'),
  game: $('screen-game'),
  summary: $('screen-summary'),
};
const modal = $('info-modal');

// ──────────────────────────────────────────────────────────────
// 4. UTILITIES
// ──────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.add('hidden'));
  screens[name].classList.remove('hidden');
}

// ──────────────────────────────────────────────────────────────
// 5. TIMER
// ──────────────────────────────────────────────────────────────
function startTimer() {
  state.seconds = 0;
  $('timer-display').textContent = '0:00';
  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.seconds++;
    $('timer-display').textContent = formatTime(state.seconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(state.timerInterval);
}

function pauseTimer() { clearInterval(state.timerInterval); }

function resumeTimer() {
  state.timerInterval = setInterval(() => {
    state.seconds++;
    $('timer-display').textContent = formatTime(state.seconds);
  }, 1000);
}

// ──────────────────────────────────────────────────────────────
// 6. CARD BUILDING
// ──────────────────────────────────────────────────────────────
function selectPairs() {
  // Prefer pairs not yet used this session
  const unused = ALL_PAIRS.filter(p => !state.usedPairIds.has(p.id));
  const pool = unused.length >= 6 ? unused : ALL_PAIRS; // reset if we've cycled through all
  const chosen = shuffle(pool).slice(0, 6);
  chosen.forEach(p => state.usedPairIds.add(p.id));
  // Reset tracking if we used all pairs
  if (state.usedPairIds.size >= ALL_PAIRS.length) state.usedPairIds.clear();
  return chosen;
}

function buildCards(pairs) {
  // One disease card + one vaccine card per pair = 12 cards
  const cards = [];
  pairs.forEach(pair => {
    cards.push({ type: 'disease', pairId: pair.id, label: pair.disease, info: pair.info, vaccineName: pair.vaccineName });
    cards.push({ type: 'vaccine', pairId: pair.id, label: pair.vaccine, info: pair.info, diseaseName: pair.info.diseaseName });
  });
  return shuffle(cards);
}

function renderCard(card, index) {
  const btn = document.createElement('div');
  btn.className = 'flip-card';
  btn.setAttribute('role', 'button');
  btn.setAttribute('tabindex', '0');
  btn.setAttribute('data-testid', `card-${index}`);
  btn.setAttribute('aria-label', `Card ${index + 1}, face down`);
  btn.dataset.index = index;

  btn.innerHTML = `
    <div class="flip-card-inner">
      <div class="flip-card-front" aria-hidden="true">
        <svg class="card-back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" opacity="0.3"/>
          <path d="M12 6v6m0 4h.01"/>
        </svg>
        <span class="card-back-label">?</span>
      </div>
      <div class="flip-card-back ${card.type === 'disease' ? 'disease-card' : 'vaccine-card'}" aria-hidden="true">
        <span class="card-type-badge">${card.type === 'disease' ? 'Disease' : 'Vaccine'}</span>
        <span class="card-name">${card.label.replace(/\n/g, '<br>')}</span>
      </div>
    </div>`;

  btn.addEventListener('click', () => handleCardClick(index));
  btn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(index); }
  });
  return btn;
}

function renderGrid() {
  const grid = $('card-grid');
  grid.innerHTML = '';
  state.cards.forEach((card, i) => {
    const el = renderCard(card, i);
    grid.appendChild(el);
  });
}

// ──────────────────────────────────────────────────────────────
// 7. GAME LOGIC
// ──────────────────────────────────────────────────────────────
function handleCardClick(index) {
  if (state.isLocked) return;
  if (state.matched.has(index)) return;
  if (state.flipped.includes(index)) return;

  // Flip the card
  flipCard(index, true);
  state.flipped.push(index);
  state.flipCount++;
  $('flip-count').textContent = state.flipCount;

  if (state.flipped.length === 2) {
    state.isLocked = true;
    const [i1, i2] = state.flipped;
    const c1 = state.cards[i1];
    const c2 = state.cards[i2];

    if (c1.pairId === c2.pairId && c1.type !== c2.type) {
      // MATCH
      setTimeout(() => {
        state.matched.add(i1);
        state.matched.add(i2);
        markMatched(i1);
        markMatched(i2);
        state.flipped = [];
        state.matchCount++;
        $('match-count').textContent = `${state.matchCount} / 6`;
        state.isLocked = false;
        pauseTimer();
        // Show info modal
        showInfoModal(c1.info, c1.type === 'disease' ? c1 : c2, c1.type === 'vaccine' ? c1 : c2);
      }, 600);
    } else {
      // MISMATCH
      setTimeout(() => {
        triggerMismatch(i1);
        triggerMismatch(i2);
        setTimeout(() => {
          flipCard(i1, false);
          flipCard(i2, false);
          removeMismatch(i1);
          removeMismatch(i2);
          state.flipped = [];
          state.isLocked = false;
        }, 500);
      }, 3000);
    }
  }
}

function getCardEl(index) {
  return $('card-grid').children[index];
}

function flipCard(index, faceUp) {
  const el = getCardEl(index);
  if (!el) return;
  if (faceUp) {
    el.classList.add('flipped');
    el.setAttribute('aria-label', `Card ${index + 1}: ${state.cards[index].type}, ${state.cards[index].label.replace(/\n/g, ' ')}`);
  } else {
    el.classList.remove('flipped');
    el.setAttribute('aria-label', `Card ${index + 1}, face down`);
  }
}

function markMatched(index) {
  const el = getCardEl(index);
  if (!el) return;
  el.classList.add('matched');
  el.setAttribute('tabindex', '-1');
}

function triggerMismatch(index) {
  const el = getCardEl(index);
  if (!el) return;
  el.classList.add('mismatch');
}

function removeMismatch(index) {
  const el = getCardEl(index);
  if (!el) return;
  el.classList.remove('mismatch');
}

// ──────────────────────────────────────────────────────────────
// 8. INFO MODAL
// ──────────────────────────────────────────────────────────────
function showInfoModal(info, diseaseCard, vaccineCard) {
  $('modal-title').textContent = info.diseaseName;
  $('modal-disease').innerHTML = `
    <strong>Before the vaccine:</strong> ${info.preVaccine}<br><br>
    <strong>After the vaccine:</strong> ${info.postVaccine}
  `;
  $('modal-pathogen').innerHTML = info.pathogen;
  $('modal-vaccine').innerHTML = info.vaccineInfo;
  modal.classList.remove('hidden');
  $('btn-continue').focus();
}

function hideInfoModal() {
  modal.classList.add('hidden');
  resumeTimer();
  if (state.matchCount === 6) {
    stopTimer();
    setTimeout(showSummary, 300);
  }
}

// ──────────────────────────────────────────────────────────────
// 9. SUMMARY
// ──────────────────────────────────────────────────────────────
function showSummary() {
  showScreen('summary');
  $('summary-time').textContent = formatTime(state.seconds);
  $('summary-flips').textContent = state.flipCount;

  const pairsEl = $('summary-pairs');
  pairsEl.innerHTML = '';
  state.selectedPairs.forEach(pair => {
    const row = document.createElement('div');
    row.className = 'summary-pair-row';
    row.innerHTML = `
      <div class="pair-match-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <div class="pair-names">
        <span class="pair-disease">${pair.disease.replace(/\n/g, ' ')}</span>
        <span class="pair-vaccine">${pair.vaccineName}</span>
      </div>`;
    pairsEl.appendChild(row);
  });
}

// ──────────────────────────────────────────────────────────────
// 10. GAME INIT / RESTART
// ──────────────────────────────────────────────────────────────
function startGame() {
  state.flipped = [];
  state.matched = new Set();
  state.flipCount = 0;
  state.matchCount = 0;
  state.isLocked = false;

  state.selectedPairs = selectPairs();
  state.cards = buildCards(state.selectedPairs);

  $('match-count').textContent = '0 / 6';
  $('flip-count').textContent = '0';

  showScreen('game');
  renderGrid();
  startTimer();
}

// ──────────────────────────────────────────────────────────────
// 11. EVENT LISTENERS
// ──────────────────────────────────────────────────────────────
$('btn-start').addEventListener('click', startGame);
$('btn-continue').addEventListener('click', hideInfoModal);
$('btn-play-again').addEventListener('click', startGame);

// Close modal on overlay click (but not card click)
modal.addEventListener('click', e => {
  if (e.target === modal) hideInfoModal();
});

// Keyboard: Escape closes modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) hideInfoModal();
});

// ──────────────────────────────────────────────────────────────
// 12. DARK MODE TOGGLE
// ──────────────────────────────────────────────────────────────
(function() {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let dark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function applyTheme(d) {
    root.setAttribute('data-theme', d ? 'dark' : 'light');
    if (toggle) {
      toggle.setAttribute('aria-label', `Switch to ${d ? 'light' : 'dark'} mode`);
      toggle.innerHTML = d
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  }

  applyTheme(dark);

  if (toggle) {
    toggle.addEventListener('click', () => {
      dark = !dark;
      applyTheme(dark);
    });
  }
})();
