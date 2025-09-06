/*
 * Cell & Protein Analytics Interactive Course - Main Script
 *
 * This script handles all the dynamic content loading, interactivity, 
 * and calculations for the course. It follows modern JavaScript practices:
 * - Code is wrapped in a DOMContentLoaded listener to ensure the HTML is ready.
 * - All functions and variables are scoped to this listener, avoiding global pollution.
 * - Event handling is done via .addEventListener() instead of inline onclick attributes.
 */

// Wait for the entire HTML document to be loaded and parsed before running any script.
document.addEventListener('DOMContentLoaded', () => {

    // =================================================================================
    // SECTION 1: DATA STORE
    // All module content, quiz data, and initialization logic is stored here.
    // =================================================================================

    const modulesData = [
        {
            id: "module1",
            title: "Module 1: Cell & Molecular Biology Fundamentals",
            content: () => `
                <div class="module-content">
                    <h2>Module 1: Fundamentals of Cell & Molecular Biology & Cell Culture</h2>
                    
                    <h3>Part A: Core Biology</h3>
                    <h4 class="styled-h4">Prokaryotes vs. Eukaryotes</h4>
                    <p>Living organisms are made of cells. The two main types are:</p>
                    <ul>
                        <li><strong>Prokaryotes:</strong> Simple cells (e.g., bacteria) lacking a true nucleus. Their DNA is located in the cytoplasm.</li>
                        <li><strong>Eukaryotes:</strong> Complex cells (e.g., animal, plant, fungal cells) with a true nucleus enclosing the DNA, and various membrane-bound organelles like mitochondria and endoplasmic reticulum.</li>
                    </ul>

                    <h4 class="styled-h4">Plasmids</h4>
                    <p>A plasmid is a small, circular, double-stranded DNA molecule that is distinct from a cell's chromosomal DNA. Plasmids naturally exist in bacterial cells and they also occur in some eukaryotes. In the lab, scientists use plasmids to introduce new genes into cells.</p>
                    <p><strong>Key Components of a Lab Plasmid:</strong></p>
                    <div class="interactive-box">
                        <h4>Interactive: Plasmid Components</h4>
                        <p class="text-sm mb-2">Imagine a circular plasmid. Click on the names to learn about each part.</p>
                        <div id="plasmid-components-buttons" class="flex flex-wrap gap-2">
                            <button class="plasmid-component-btn bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-full text-xs sm:text-sm" data-info="Origin of Replication (ori): The DNA sequence where replication of the plasmid begins, allowing it to be copied within the host cell.">Origin of Replication (ori)</button>
                            <button class="plasmid-component-btn bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-full text-xs sm:text-sm" data-info="Promoter: A DNA sequence that initiates transcription of a particular gene. It's located near the transcription start sites of genes. E.g., CMV promoter for strong expression in mammalian cells.">Promoter</button>
                            <button class="plasmid-component-btn bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full text-xs sm:text-sm" data-info="Multiple Cloning Site (MCS) / Polylinker: A short segment of DNA which contains many (up to ~20) restriction enzyme sites - a standard feature of engineered plasmids. This allows easy insertion of your gene of interest using restriction enzymes.">Multiple Cloning Site (MCS)</button>
                            <button class="plasmid-component-btn bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded-full text-xs sm:text-sm" data-info="Gene of Interest: The specific gene that you want to study or express in the host cells (e.g., a gene coding for GFP, a therapeutic protein, or a regulatory RNA).">Gene of Interest</button>
                            <button class="plasmid-component-btn bg-yellow-500 hover:bg-yellow-600 text-black py-1 px-3 rounded-full text-xs sm:text-sm" data-info="Selection Marker: A gene that confers a trait suitable for artificial selection. For example, an antibiotic resistance gene (like Ampicillin or Kanamycin resistance) allows only cells that have successfully taken up the plasmid to grow in the presence of that antibiotic.">Selection Marker</button>
                            <button class="plasmid-component-btn bg-pink-500 hover:bg-pink-600 text-white py-1 px-3 rounded-full text-xs sm:text-sm" data-info="Tag (e.g., GFP, FLAG, His-tag): A short DNA sequence fused to the gene of interest that, when expressed, adds a peptide tag to the protein. This tag can be used for detection (e.g., GFP for fluorescence, FLAG for antibody detection) or purification (e.g., His-tag for affinity chromatography).">Tag (e.g., GFP, FLAG)</button>
                        </div>
                        <div id="plasmid-component-info" class="plasmid-info-box mt-3 p-3 rounded bg-blue-100 border border-blue-300 text-sm text-blue-800" style="display: none;">Select a component to see its description.</div>
                        <p class="mt-2 text-xs text-gray-600">Note: DNA is negatively charged due to its phosphate backbone.</p>
                    </div>

                    <h3>Part B: Cell Culture Deep Dive</h3>
                    <h4 class="styled-h4">Introduction to Cell Culture</h4>
                    <p>Cell culture is the process by which cells are grown under controlled conditions, generally outside their natural environment (<em>in vitro</em>). Cells can be grown as:</p>
                    <ul>
                        <li><strong>Adherent cultures:</strong> Cells grow attached to a surface (e.g., flask, plate).</li>
                        <li><strong>Suspension cultures:</strong> Cells float freely in the culture medium.</li>
                    </ul>

                    <h4 class="styled-h4">Primary Cultures vs. Cell Lines</h4>
                    <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 my-4 border">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr><th scope="col" class="px-4 py-2 sm:px-6 sm:py-3">Feature</th><th scope="col" class="px-4 py-2 sm:px-6 sm:py-3">Primary Cultures</th><th scope="col" class="px-4 py-2 sm:px-6 sm:py-3">Cell Lines</th></tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b"><td class="px-4 py-2 sm:px-6 sm:py-4">Origin</td><td class="px-4 py-2 sm:px-6 sm:py-4">Directly from tissues/organs</td><td class="px-4 py-2 sm:px-6 sm:py-4">Immortalized cells (e.g., tumor-derived, virally transformed)</td></tr>
                            <tr class="bg-gray-50 border-b"><td class="px-4 py-2 sm:px-6 sm:py-4">Lifespan</td><td class="px-4 py-2 sm:px-6 sm:py-4">Limited (finite)</td><td class="px-4 py-2 sm:px-6 sm:py-4">Unlimited (continuous)</td></tr>
                            <tr class="bg-white border-b"><td class="px-4 py-2 sm:px-6 sm:py-4">Properties</td><td class="px-4 py-2 sm:px-6 sm:py-4">More representative of in vivo state</td><td class="px-4 py-2 sm:px-6 sm:py-4">May have altered characteristics, easier to grow</td></tr>
                            <tr class="bg-gray-50"><td class="px-4 py-2 sm:px-6 sm:py-4">Examples</td><td class="px-4 py-2 sm:px-6 sm:py-4">Neurons, fibroblasts from biopsy</td><td class="px-4 py-2 sm:px-6 sm:py-4">HEK293, HeLa, CHO</td></tr>
                        </tbody>
                    </table>
                    </div>
                    <p><strong>HEK293 Cells:</strong> Human Embryonic Kidney cells, transformed with Adenovirus 5 DNA. They are adherent epithelial cells commonly used for their high transfection efficiency and protein production capabilities.</p>

                    <h4 class="styled-h4">Cell Culture Environment & Media</h4>
                    <p>Cells need a controlled environment:</p>
                    <ul>
                        <li><strong>Temperature:</strong> Typically 37&deg;C for mammalian cells.</li>
                        <li><strong>CO<sub>2</sub>:</strong> Usually 5% in the incubator to work with the NaHCO<sub>3</sub> buffer system in the medium to maintain physiological pH.</li>
                        <li><strong>Humidity:</strong> High (70-100%) to prevent evaporation of medium.</li>
                        <li><strong>Sterility:</strong> Essential to prevent contamination.</li>
                    </ul>
                    <p><strong>Culture Media:</strong> Provides nutrients for cell growth.</p>
                    <div class="interactive-box">
                        <h4>Interactive: Media Prep Station</h4>
                        <p class="text-sm mb-2">You are preparing complete DMEM. Click on each component you would add to the basal DMEM to learn more about it.</p>
                        <div id="media-components-list" class="my-2 space-y-1">
                            <button class="media-component-button block w-full text-left p-2 rounded hover:bg-blue-200 text-xs sm:text-sm" data-info="Basal DMEM (Dulbecco's Modified Eagle's Medium): Contains a mixture of inorganic salts (for osmotic balance and membrane potential), L-amino acids (building blocks for proteins), vitamins (cofactors for enzymes), D-glucose (energy source), and often sodium pyruvate (additional energy source). This is the foundation of your complete medium.">1. Basal DMEM (salts, amino acids, vitamins, glucose)</button>
                            <button class="media-component-button block w-full text-left p-2 rounded hover:bg-blue-200 text-xs sm:text-sm" data-info="Fetal Bovine Serum (FBS) or Fetal Calf Serum (FCS): Typically added at 5-20% (10% is common). It's a complex mixture providing growth factors, hormones, attachment factors, transport proteins, and trace elements. Crucial for the growth of many cell lines. Batch-to-batch variability is a concern. Can be heat-inactivated (56°C for 30 min) to destroy complement proteins that might lyse cells.">2. Fetal Bovine Serum (FBS/FCS) - typically 10%</button>
                            <button class="media-component-button block w-full text-left p-2 rounded hover:bg-blue-200 text-xs sm:text-sm" data-info="L-Glutamine: An essential amino acid required by cells in culture, serving as a nitrogen source for nucleotide and amino acid synthesis, and an energy source. It's unstable in liquid media at 37°C, degrading over time (half-life ~1 week). Often added fresh or a stable dipeptide form like GlutaMAX™ is used. Typical concentration is 2-4 mM.">3. L-Glutamine (or GlutaMAX&trade;) - typically 2-4 mM</button>
                            <button class="media-component-button block w-full text-left p-2 rounded hover:bg-blue-200 text-xs sm:text-sm" data-info="Penicillin-Streptomycin (Pen-Strep): An antibiotic/antimycotic solution typically added at 1% (final concentration ~100 U/mL Penicillin, ~100 µg/mL Streptomycin). Used to prevent bacterial contamination. While common, routine use can mask poor aseptic technique and may lead to antibiotic-resistant strains or affect cell physiology. Should be used judiciously.">4. Penicillin-Streptomycin (optional, but common) - typically 1%</button>
                        </div>
                        <div id="media-prep-component-info" class="media-component-info-box mt-3 p-3 rounded bg-green-100 border border-green-300 text-sm text-green-800" style="display: none;">Click a component to see its description.</div>
                        <p class="text-sm mt-2">Each component is added aseptically under the laminar flow hood.</p>
                    </div>
                    <ul>
                        <li><strong>Phenol Red:</strong> A pH indicator. Medium is typically reddish-orange at pH 7.4. It turns yellow if acidic (e.g., due to excessive cell metabolism or bacterial contamination) and purple if alkaline.</li>
                        <li><strong>Other Additives (depending on cell type/media):</strong> Sodium Bicarbonate (NaHCO<sub>3</sub> - primary buffering component with incubator CO<sub>2</sub>), HEPES buffer (alternative non-$CO_2$ dependent buffer), non-essential amino acids, specific growth factors.</li>
                    </ul>
                    
                    <h4 class="styled-h4">Sterilization & Aseptic Technique</h4>
                    <p>Sterilization aims to kill or inactivate all viable microorganisms. Aseptic technique refers to the practices used to prevent contamination.</p>
                    <ul>
                        <li><strong>Flaming:</strong> Sterilizing bottle necks, metal tools.</li>
                        <li><strong>UV Light (254nm):</strong> Surface sterilization (e.g., inside hoods). Max 30cm distance. Safety hazard (burns, mutagenesis).</li>
                        <li><strong>Sterile Filtration (0.22 &mu;m filter):</strong> For heat-sensitive liquids like media and serum.</li>
                        <li><strong>Autoclaving (Steam Sterilization):</strong> High pressure and temperature (e.g., 121&deg;C, 15 psi, 15-20 min) for liquids (not media with sensitive components), glassware, and some plastics.</li>
                        <li><strong>Gamma Radiation:</strong> For pre-sterilized plastic consumables (flasks, pipettes).</li>
                    </ul>

                    <h4 class="styled-h4">Contamination in Cell Culture</h4>
                    <p>Contamination is a major issue in cell culture. Common types include:</p>
                    <ul class="list-none pl-0">
                        <li class="mb-2 p-3 border-l-4 border-red-500 bg-red-50 rounded-r-md">
                            <strong>Bacteria:</strong> Tiny, single-celled prokaryotes.
                            <br><span class="text-xs text-gray-600">Spot them by: Rapid medium turbidity (cloudiness), sudden pH drop (medium turns yellow), and sometimes a "storm" of moving particles visible under the microscope.</span>
                        </li>
                        <li class="mb-2 p-3 border-l-4 border-orange-500 bg-orange-50 rounded-r-md">
                            <strong>Yeasts:</strong> Single-celled eukaryotic fungi.
                            <br><span class="text-xs text-gray-600">Spot them by: Medium may become slightly turbid; individual ovoid or budding particles visible under microscope, often appearing as small, distinct dots or clusters.</span>
                        </li>
                        <li class="mb-2 p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-md">
                            <strong>Molds (Fungi):</strong> Multicellular eukaryotic fungi that grow as hyphae (filaments).
                            <br><span class="text-xs text-gray-600">Spot them by: Visible fuzzy or cotton-like colonies, often on the surface of the medium or flask, and a network of filaments seen under the microscope.</span>
                        </li>
                        <li class="mb-2 p-3 border-l-4 border-purple-500 bg-purple-50 rounded-r-md">
                            <strong>Mycoplasma:</strong> Very small bacteria lacking a cell wall, making them hard to see and filter.
                            <br><span class="text-xs text-gray-600">Spot them by: Often no visible turbidity; signs include slower cell growth, changes in cell morphology, premature yellowing of medium, or a "milky way-like fog" around nuclei when stained with DAPI.</span>
                        </li>
                         <li class="mb-2 p-3 border-l-4 border-teal-500 bg-teal-50 rounded-r-md">
                            <strong>Viruses:</strong> Submicroscopic infectious agents replicating only inside living cells.
                            <br><span class="text-xs text-gray-600">Spot them by: Often no immediate visible signs; may cause cytopathic effects (CPE) like cell rounding or lysis, but diagnosis usually requires specific assays (e.g., ELISA, PCR).</span>
                        </li>
                         <li class="mb-2 p-3 border-l-4 border-gray-500 bg-gray-100 rounded-r-md">
                            <strong>Cross-contamination (other cell lines):</strong> Unwanted presence of a different cell line in the culture.
                            <br><span class="text-xs text-gray-600">Spot them by: Unexpected changes in cell morphology, growth rate, or experimental results; requires specific testing like STR profiling for confirmation.</span>
                        </li>
                    </ul>
                    <div class="interactive-box">
                        <h4>Interactive: Contamination Detective!</h4>
                        <p class="text-sm mb-2">What type of contamination is most likely described in each scenario?</p>
                        <div id="contamination-quiz-module1" class="space-y-4"></div>
                    </div>
                </div>
            `,
            quiz: [
                {
                    question: "Which of these is NOT a typical component of a plasmid used in molecular cloning for expression in eukaryotic cells?",
                    options: ["Origin of Replication (ori)", "Eukaryotic Promoter (e.g., CMV)", "Selectable Marker (e.g., antibiotic resistance)", "Ribosome (the organelle)"],
                    answer: "Ribosome (the organelle)",
                    type: "mcq",
                    explanation: "Plasmids contain DNA sequences like promoters and origins of replication. Ribosomes are cellular machinery for protein synthesis and are not part of the plasmid DNA itself."
                },
                {
                    question: "What is the primary purpose of heat-inactivating serum (e.g., FBS/FCS) for cell culture?",
                    options: ["To sterilize the serum by killing all microbes", "To inactivate complement proteins that could harm cells", "To enhance the activity of growth factors in the serum", "To remove any residual antibiotics from the serum"],
                    answer: "To inactivate complement proteins that could harm cells",
                    type: "mcq",
                    explanation: "Heat inactivation (typically 56°C for 30 minutes) denatures complement proteins, which can otherwise cause cell lysis or activate immune responses in culture."
                },
                {
                    question: "A cell culture medium containing Phenol Red as a pH indicator appears bright yellow. This most likely indicates the medium is:",
                    options: ["Too alkaline (pH too high)", "Too acidic (pH too low)", "Perfectly neutral (pH 7.4)", "Contaminated with mold"],
                    answer: "Too acidic (pH too low)",
                    type: "mcq",
                    explanation: "Phenol Red turns yellow at acidic pH (below ~6.8), often due to excessive cell metabolism producing lactic acid or bacterial contamination producing acidic byproducts."
                },
                {
                    question: "Mycoplasma contamination is notoriously difficult to detect in cell cultures because:",
                    options: ["They are very large and thus easily filtered out during media preparation.", "They cause rapid, visible cloudiness (turbidity) in the culture medium within hours.", "They are extremely small, lack a cell wall, can pass through standard 0.22 &mu;m sterilization filters, and often do not cause obvious visual changes like turbidity.", "They only grow optimally at room temperature, not in a 37&deg;C incubator."],
                    answer: "They are extremely small, lack a cell wall, can pass through standard 0.22 &mu;m sterilization filters, and often do not cause obvious visual changes like turbidity.",
                    type: "mcq",
                    explanation: "Mycoplasma are among the smallest self-replicating organisms and their lack of a cell wall makes them resistant to some antibiotics and flexible enough to pass through filters. They often cause subtle changes in cell behavior rather than obvious turbidity."
                }
            ],
            // `init` function sets up event listeners for this module's interactive elements
            init: () => {
                // Plasmid Components Interaction
                const plasmidButtonsContainer = document.getElementById('plasmid-components-buttons');
                const plasmidInfoDiv = document.getElementById('plasmid-component-info');
                if (plasmidButtonsContainer && plasmidInfoDiv) {
                    const plasmidButtons = plasmidButtonsContainer.querySelectorAll('.plasmid-component-btn');
                    plasmidButtons.forEach(button => {
                        button.addEventListener('click', () => {
                            plasmidInfoDiv.innerHTML = button.dataset.info;
                            plasmidInfoDiv.style.display = 'block';
                            plasmidButtons.forEach(btn => btn.classList.remove('ring-2', 'ring-offset-2', 'ring-blue-700', 'scale-105'));
                            button.classList.add('ring-2', 'ring-offset-2', 'ring-blue-700', 'scale-105');
                        });
                    });
                }

                // Media Prep Station Interaction
                const mediaButtonsContainer = document.getElementById('media-components-list');
                const mediaPrepInfoDiv = document.getElementById('media-prep-component-info');
                if (mediaButtonsContainer && mediaPrepInfoDiv) {
                    const mediaButtons = mediaButtonsContainer.querySelectorAll('.media-component-button');
                    mediaButtons.forEach(button => {
                        button.addEventListener('click', () => {
                            mediaPrepInfoDiv.innerHTML = button.dataset.info;
                            mediaPrepInfoDiv.style.display = 'block';
                            mediaButtons.forEach(btn => btn.classList.remove('selected'));
                            button.classList.add('selected');
                        });
                    });
                }
                
                // Contamination Detective Quiz for Module 1
                const contaminationQuizDataModule1 = [
                    {
                        description: "Your cell culture medium has suddenly become cloudy, and under the microscope, you see tiny, fast-moving rod-shaped or spherical particles between your cells. The medium has also turned yellow quickly.",
                        options: ["Mycoplasma", "Yeast", "Bacteria", "Viral"],
                        answer: "Bacteria"
                    },
                    {
                        description: "You notice a 'milky way-like fog' or tiny specks around the nuclei of your cells when stained with DAPI. Cell growth has slowed, and the medium turns yellow faster than usual, but there's no visible cloudiness.",
                        options: ["Fungal (mold)", "Mycoplasma", "Cross-contamination with other cells", "Bacteria"],
                        answer: "Mycoplasma"
                    },
                    {
                        description: "You see fuzzy, filamentous structures growing in your flask, some of which might be floating on the surface of the medium. Some areas might have a cottony appearance.",
                        options: ["Yeast", "Bacteria", "Fungal (mold)", "Mycoplasma"],
                        answer: "Fungal (mold)"
                    }
                ];
                const quizContainerModule1 = document.getElementById('contamination-quiz-module1');
                if (quizContainerModule1) {
                    quizContainerModule1.innerHTML = '';
                    contaminationQuizDataModule1.forEach((q, index) => {
                        const qDiv = document.createElement('div');
                        qDiv.className = 'quiz-question p-4 mb-3 bg-white rounded-lg shadow';
                        let optionsHtml = `<p class="font-medium mb-2 text-sm">${index + 1}. ${q.description}</p><div class="space-y-1">`;
                        q.options.forEach(opt => {
                            optionsHtml += `<button class="quiz-option text-xs sm:text-sm" data-answer="${q.answer}">${opt}</button>`;
                        });
                        optionsHtml += `</div><div class="feedback-message text-xs mt-2 p-1.5 rounded-md hidden"></div>`;
                        qDiv.innerHTML = optionsHtml;

                        qDiv.querySelectorAll('.quiz-option').forEach(optButton => {
                            optButton.addEventListener('click', () => {
                                const parentQuestionDiv = optButton.closest('.quiz-question');
                                parentQuestionDiv.querySelectorAll('.quiz-option').forEach(btn => {
                                    btn.disabled = true;
                                    btn.classList.remove('correct', 'incorrect');
                                });
                                const feedbackEl = parentQuestionDiv.querySelector('.feedback-message');
                                feedbackEl.classList.remove('hidden', 'bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700');

                                if (optButton.textContent === q.answer) {
                                    optButton.classList.add('correct');
                                    feedbackEl.innerHTML = '<strong>Correct!</strong>';
                                    feedbackEl.classList.add('bg-green-100', 'text-green-700');
                                } else {
                                    optButton.classList.add('incorrect');
                                    feedbackEl.innerHTML = `<strong>Incorrect.</strong> Correct answer: ${q.answer}`;
                                    feedbackEl.classList.add('bg-red-100', 'text-red-700');
                                    parentQuestionDiv.querySelectorAll('.quiz-option').forEach(btn => {
                                        if (btn.textContent === q.answer) btn.classList.add('correct');
                                    });
                                }
                                feedbackEl.classList.remove('hidden');
                            });
                        });
                        quizContainerModule1.appendChild(qDiv);
                    });
                }
            }
        },
        {
            id: "module2",
            title: "Module 2: Dilutions, Concentrations & Cell Counting",
            content: () => `
                <div class="module-content">
                    <h2>Module 2: Mastering Dilutions, Concentrations & Cell Counting</h2>
                    <p>Accurate calculations are fundamental in molecular biology. This module will guide you through essential concepts and practical applications.</p>

                    <h3>Units and Conversions</h3>
                    <p>Understanding and converting between different units of volume and concentration is crucial for accurate lab work.</p>
                    <ul>
                        <li><strong>Volume:</strong> Liters (L), milliliters (mL), microliters (&mu;L)
                            <ul class="list-inside list-disc ml-4 bg-slate-100 p-3 rounded-md shadow-sm">
                                <li>1 Liter (L) = 1000 milliliters (mL)</li>
                                <li>1 milliliter (mL) = 1000 microliters (&mu;L)</li>
                                <li>Therefore, 1 Liter (L) = 1,000,000 microliters (&mu;L)</li>
                            </ul>
                        </li>
                        <li class="mt-2"><strong>Concentration:</strong> Molarity (M = moles/Liter), mg/mL, &mu;g/&mu;L, percentages (%)</li>
                    </ul>
                    <div class="interactive-box">
                        <h4>Interactive: Unit Converter</h4>
                        <p class="text-sm mb-2">Practice converting milliliters (mL) to microliters (&mu;L). Enter a value in mL and click "Convert".</p>
                        <div class="flex flex-wrap items-center gap-2">
                            <label for="ml-input" class="sr-only">Milliliters:</label>
                            <input type="number" id="ml-input" placeholder="Enter mL" class="border p-2 rounded w-32 text-sm">
                            <button id="unit-convert-btn" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm">Convert to &mu;L</button>
                        </div>
                        <p id="ul-output" class="mt-2 text-sm font-medium text-blue-700"></p>
                    </div>

                    <h3>The Dilution Formula: <span class="formula">C<sub>1</sub> &times; V<sub>1</sub> = C<sub>2</sub> &times; V<sub>2</sub></span></h3>
                    <p>This is the cornerstone formula for calculating dilutions. It states that the amount of solute remains constant before and after dilution.</p>
                    <ul class="bg-slate-100 p-3 rounded-md shadow-sm">
                        <li><strong>C<sub>1</sub></strong> = Initial concentration (concentration of your stock solution)</li>
                        <li><strong>V<sub>1</sub></strong> = Initial volume (the volume of stock solution you need to take)</li>
                        <li><strong>C<sub>2</sub></strong> = Final concentration (the desired concentration of your diluted solution)</li>
                        <li><strong>V<sub>2</sub></strong> = Final volume (the total volume of your desired diluted solution)</li>
                    </ul>
                    
                    <div class="interactive-box">
                        <h4>Interactive: Dilution Calculator</h4>
                        <p class="text-sm mb-3">Enter any three values (C1, V1, C2, V2) and the units for concentration and volume. The calculator will determine the missing value.</p>
                        <div class="calculator grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 items-end">
                            <div>
                                <label for="c1_calc" class="block text-sm font-medium text-gray-700">C<sub>1</sub> (Stock Conc.):</label>
                                <input type="number" id="c1_calc" placeholder="e.g., 10" class="w-full mt-1"> 
                            </div>
                            <div>
                                <label for="v1_calc" class="block text-sm font-medium text-gray-700">V<sub>1</sub> (Stock Vol.):</label>
                                <input type="number" id="v1_calc" placeholder="e.g., ?" class="w-full mt-1"> 
                            </div>
                            <div>
                                <label for="c2_calc" class="block text-sm font-medium text-gray-700">C<sub>2</sub> (Final Conc.):</label>
                                <input type="number" id="c2_calc" placeholder="e.g., 1" class="w-full mt-1"> 
                            </div>
                            <div>
                                <label for="v2_calc" class="block text-sm font-medium text-gray-700">V<sub>2</sub> (Final Vol.):</label>
                                <input type="number" id="v2_calc" placeholder="e.g., 100" class="w-full mt-1"> 
                            </div>
                            <div class="sm:col-span-1">
                                <label for="calc_units_conc" class="block text-sm font-medium text-gray-700">Concentration Units:</label>
                                <select id="calc_units_conc" class="w-full mt-1">
                                    <option value="M">M (Molar)</option>
                                    <option value="mM">mM (millimolar)</option>
                                    <option value="&mu;M">&mu;M (micromolar)</option>
                                    <option value="mg/mL">mg/mL</option>
                                    <option value="&mu;g/mL">&mu;g/mL</option>
                                    <option value="ng/&mu;L">ng/&mu;L</option>
                                    <option value="%">% (percent)</option>
                                    <option value="X">X (fold, e.g. 10X stock)</option>
                                </select>
                            </div>
                            <div class="sm:col-span-1">
                                <label for="calc_units_vol" class="block text-sm font-medium text-gray-700">Volume Units:</label>
                                <select id="calc_units_vol" class="w-full mt-1">
                                    <option value="mL">mL (milliliters)</option>
                                    <option value="&mu;L">&mu;L (microliters)</option>
                                    <option value="L">L (liters)</option>
                                </select>
                            </div>
                            <div class="sm:col-span-2 mt-2">
                                <button id="dilution-calc-btn" class="w-full py-2">Calculate Missing Value</button>
                            </div>
                        </div>
                        <div id="dilution-result-container" class="mt-3 p-3 bg-white rounded-md shadow hidden">
                            <p id="dilution-result" class="font-semibold text-blue-700"></p>
                            <p id="dilution-steps" class="mt-1 text-sm text-gray-600"></p>
                        </div>
                    </div>

                    <h3>Cell Counting with a Hemocytometer (Neubauer Chamber)</h3>
                    <p>A hemocytometer is a specialized counting chamber slide used to determine the concentration of cells in a liquid sample.</p>
                    <img src="Neubauer-chamber-counting example.jpg" alt="Neubauer chamber counting grid with example cells" class="my-4 rounded-lg shadow-md mx-auto block max-w-full sm:max-w-md w-auto">
                    <p><strong>General Procedure & Calculation:</strong></p>
                     <ol class="list-decimal list-inside bg-slate-100 p-3 rounded-md shadow-sm">
                        <li>Clean the hemocytometer and coverslip.</li>
                        <li>Mix your cell suspension thoroughly. Often, cells are mixed 1:1 with Trypan Blue stain (e.g., 10 &mu;L cells + 10 &mu;L Trypan Blue). Trypan Blue stains dead cells blue, allowing for viability assessment. This creates a <strong>dilution factor of 2</strong>.</li>
                        <li>Carefully load about 10 &mu;L of the cell suspension/Trypan Blue mixture into one side of the hemocytometer chamber. Avoid overfilling.</li>
                        <li>Under a microscope (typically at 10x objective), focus on the grid lines.</li>
                        <li>Count the cells in the 4 large corner squares. Establish a consistent counting rule.</li>
                        <li>The volume of one large square is 10<sup>-4</sup> mL.</li>
                    </ol>
                    <p class="mt-4"><strong>Calculation Formula:</strong></p>
                    <p><span class="formula">Cells/mL = (Average cells per large square) &times; Dilution Factor &times; 10<sup>4</sup></span></p>
                    
                    <div class="interactive-box">
                        <h4>Interactive: Cell Count Calculator</h4>
                        <p class="text-sm mb-3">Enter the total number of live (unstained) cells counted in the 4 large corner squares and the dilution factor used.</p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 items-center">
                            <div>
                                <label for="cells-counted" class="block text-sm font-medium text-gray-700">Total live cells in 4 large squares:</label>
                                <input type="number" id="cells-counted" placeholder="e.g., 240" class="w-full mt-1">
                            </div>
                            <div>
                                <label for="dilution-factor" class="block text-sm font-medium text-gray-700">Dilution factor (e.g., 2 for 1:1 mix):</label>
                                <input type="number" id="dilution-factor" value="2" class="w-full mt-1">
                            </div>
                            <div class="sm:col-span-2 mt-2">
                                <button id="cell-density-btn" class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm w-full">Calculate Cell Density (cells/mL)</button>
                            </div>
                        </div>
                        <p id="cell-density-output" class="mt-3 font-semibold text-green-700"></p>
                    </div>
                    
                    <h3>Practice Problems</h3>
                    <div id="practice-problems-container" class="space-y-6">
                        <div class="practice-problem-box">
                            <p class="font-semibold">1. BSA Dilution:</p>
                            <p>You need to prepare 1 mL of 5% BSA solution in PBS from a 100% (w/v) BSA stock. How much stock BSA and PBS do you need?</p>
                            <div class="mt-2 space-y-2 sm:space-y-0 sm:flex sm:items-end sm:gap-3">
                                <div>
                                    <label for="bsa-stock-input" class="block text-xs font-medium text-gray-600">Stock BSA (&mu;L):</label>
                                    <input type="number" id="bsa-stock-input" placeholder="e.g., 50" class="text-sm p-1 w-28">
                                </div>
                                <div>
                                    <label for="pbs-input" class="block text-xs font-medium text-gray-600">PBS (&mu;L):</label>
                                    <input type="number" id="pbs-input" placeholder="e.g., 950" class="text-sm p-1 w-28">
                                </div>
                                <button id="check-bsa-btn" class="text-sm px-3 py-1.5">Check Answer</button>
                            </div>
                            <div id="bsa-dilution-feedback" class="practice-feedback text-sm mt-2 hidden"></div>
                            <div id="bsa-dilution-solution" class="solution-details hidden">
                                <strong>Detailed Solution:</strong><br>Using C<sub>1</sub>V<sub>1</sub> = C<sub>2</sub>V<sub>2</sub>:<br>
                                V<sub>1</sub> = (C<sub>2</sub> &times; V<sub>2</sub>) / C<sub>1</sub> = (5% &times; 1 mL) / 100% = 0.05 mL = <strong>50 &mu;L of 100% BSA stock</strong>.<br>
                                Volume of PBS = V<sub>2</sub> - V<sub>1</sub> = 1 mL - 0.05 mL = 0.95 mL = <strong>950 &mu;L of PBS</strong>.
                            </div>
                        </div>

                        <div class="practice-problem-box">
                            <p class="font-semibold">2. Triton X-100 Dilution:</p>
                            <p>You need to prepare 10 mL of 0.1% Triton X-100 solution from a 10% (v/v) stock solution. How much stock Triton X-100 and diluent do you need?</p>
                            <div class="mt-2 space-y-2 sm:space-y-0 sm:flex sm:items-end sm:gap-3">
                                <div>
                                    <label for="triton-stock-input" class="block text-xs font-medium text-gray-600">Stock Triton X-100 (&mu;L):</label>
                                    <input type="number" id="triton-stock-input" placeholder="e.g., 100" class="text-sm p-1 w-36">
                                </div>
                                <div>
                                    <label for="triton-diluent-input" class="block text-xs font-medium text-gray-600">Diluent (mL):</label>
                                    <input type="number" step="0.1" id="triton-diluent-input" placeholder="e.g., 9.9" class="text-sm p-1 w-28">
                                </div>
                                <button id="check-triton-btn" class="text-sm px-3 py-1.5">Check Answer</button>
                            </div>
                            <div id="triton-dilution-feedback" class="practice-feedback text-sm mt-2 hidden"></div>
                            <div id="triton-dilution-solution" class="solution-details hidden">
                                <strong>Detailed Solution:</strong><br>Using C<sub>1</sub>V<sub>1</sub> = C<sub>2</sub>V<sub>2</sub>:<br>
                                V<sub>1</sub> = (C<sub>2</sub> &times; V<sub>2</sub>) / C<sub>1</sub> = (0.1% &times; 10 mL) / 10% = 0.1 mL = <strong>100 &mu;L of 10% Triton X-100 stock</strong>.<br>
                                Volume of Diluent = V<sub>2</sub> - V<sub>1</sub> = 10 mL - 0.1 mL = <strong>9.9 mL</strong>.
                            </div>
                        </div>

                        <div class="practice-problem-box">
                            <p class="font-semibold">3. Secondary Antibody Dilution (for 6 wells):</p>
                            <p>You need to prepare a secondary antibody solution for 6 wells of a plate. Each well requires 200 &mu;L of antibody solution at a 1:1000 dilution from a concentrated stock. How much antibody stock and buffer do you need for exactly 6 wells?</p>
                            <div class="mt-2 space-y-2 sm:space-y-0 sm:flex sm:items-end sm:gap-3">
                                <div>
                                    <label for="antibody-stock-input" class="block text-xs font-medium text-gray-600">Antibody Stock (&mu;L):</label>
                                    <input type="number" step="0.1" id="antibody-stock-input" placeholder="e.g., 1.2" class="text-sm p-1 w-32">
                                </div>
                                <div>
                                    <label for="antibody-buffer-input" class="block text-xs font-medium text-gray-600">Buffer (&mu;L):</label>
                                    <input type="number" step="0.1" id="antibody-buffer-input" placeholder="e.g., 1198.8" class="text-sm p-1 w-32">
                                </div>
                                <button id="check-antibody-btn" class="text-sm px-3 py-1.5">Check Answer</button>
                            </div>
                            <div id="antibody-dilution-feedback" class="practice-feedback text-sm mt-2 hidden"></div>
                            <div id="antibody-dilution-solution" class="solution-details hidden">
                                <strong>Detailed Solution (for 6 wells exactly):</strong><br>
                                Total volume needed = 6 wells &times; 200 &mu;L/well = 1200 &mu;L.<br>
                                Volume of antibody stock = 1200 &mu;L / 1000 = <strong>1.2 &mu;L</strong>.<br>
                                Volume of buffer = 1200 &mu;L - 1.2 &mu;L = <strong>1198.8 &mu;L</strong>.<br>
                                <em>(Note: In practice, you'd prepare a bit extra.)</em>
                            </div>
                        </div>

                        <div class="practice-problem-box">
                            <p class="font-semibold">4. Cell Plating:</p>
                            <p>You have a cell stock with a concentration of 1 &times; 10<sup>6</sup> cells/mL. You want to plate 2 &times; 10<sup>5</sup> cells into each well. What volume of your cell stock do you need to add to each well?</p>
                            <div class="mt-2 space-y-2 sm:space-y-0 sm:flex sm:items-end sm:gap-3">
                                <div>
                                    <label for="cell-plating-input" class="block text-xs font-medium text-gray-600">Cell Stock Volume per well (&mu;L):</label>
                                    <input type="number" id="cell-plating-input" placeholder="e.g., 200" class="text-sm p-1 w-48">
                                </div>
                                <button id="check-plating-btn" class="text-sm px-3 py-1.5">Check Answer</button>
                            </div>
                            <div id="cell-plating-feedback" class="practice-feedback text-sm mt-2 hidden"></div>
                            <div id="cell-plating-solution" class="solution-details hidden">
                                <strong>Detailed Solution:</strong><br>
                                Volume needed = (Desired cells) / (Stock concentration) = (2 &times; 10<sup>5</sup> cells) / (1 &times; 10<sup>6</sup> cells/mL) = 0.2 mL.<br>
                                Convert to &mu;L: 0.2 mL &times; 1000 &mu;L/mL = <strong>200 &mu;L per well</strong>.
                            </div>
                        </div>
                    </div>
                </div>
            `,
            quiz: [
                {
                    question: "If you have a stock solution of 10M NaOH and you want to make 500 mL of 0.5M NaOH, how much of the stock solution do you need?",
                    options: ["2.5 mL", "25 mL", "50 mL", "5 mL"],
                    answer: "25 mL",
                    type: "mcq",
                    explanation: "Using C<sub>1</sub>V<sub>1</sub> = C<sub>2</sub>V<sub>2</sub>: (10M)(V<sub>1</sub>) = (0.5M)(500mL). So, V<sub>1</sub> = (0.5 &times; 500) / 10 = 250 / 10 = 25 mL."
                },
                {
                    question: "You count an average of 60 live cells per large square in a Neubauer hemocytometer. Your cells were diluted 1:2 with Trypan Blue before counting. What is the concentration of live cells in your original sample (cells/mL)?",
                    options: ["0.6 &times; 10<sup>4</sup> cells/mL", "1.2 &times; 10<sup>5</sup> cells/mL", "6.0 &times; 10<sup>5</sup> cells/mL", "1.2 &times; 10<sup>6</sup> cells/mL"],
                    answer: "1.2 &times; 10<sup>6</sup> cells/mL",
                    type: "mcq",
                    explanation: "Cells/mL = (Avg cells per square) &times; Dilution Factor &times; 10<sup>4</sup> = 60 &times; 2 &times; 10<sup>4</sup> = 120 &times; 10<sup>4</sup> = 1.2 &times; 10<sup>6</sup> cells/mL."
                },
                {
                    question: "To make 50 mL of a 200 &mu;M solution from a 10 mM stock, how much stock solution is required?",
                    options: ["10 &mu;L", "100 &mu;L", "1 mL", "0.1 &mu;L"],
                    answer: "1 mL",
                    type: "mcq",
                    explanation: "First, ensure units are consistent. 10 mM = 10,000 &mu;M. C<sub>1</sub> = 10,000 &mu;M, V<sub>1</sub> = ?, C<sub>2</sub> = 200 &mu;M, V<sub>2</sub> = 50 mL. V<sub>1</sub> = (200 &mu;M &times; 50 mL) / 10,000 &mu;M = 10,000 / 10,000 mL = 1 mL."
                }
            ],
            init: () => {
                // Attach event listeners for Module 2 interactive elements
                document.getElementById('unit-convert-btn')?.addEventListener('click', convertUnits);
                document.getElementById('dilution-calc-btn')?.addEventListener('click', calculateDilution);
                document.getElementById('cell-density-btn')?.addEventListener('click', calculateCellDensity);

                // Attach listeners for practice problems
                document.getElementById('check-bsa-btn')?.addEventListener('click', () => checkPracticeAnswer('bsa-dilution', [50, 950], ['bsa-stock-input', 'pbs-input']));
                document.getElementById('check-triton-btn')?.addEventListener('click', () => checkPracticeAnswer('triton-dilution', [100, 9.9], ['triton-stock-input', 'triton-diluent-input']));
                document.getElementById('check-antibody-btn')?.addEventListener('click', () => checkPracticeAnswer('antibody-dilution', [1.2, 1198.8], ['antibody-stock-input', 'antibody-buffer-input']));
                document.getElementById('check-plating-btn')?.addEventListener('click', () => checkPracticeAnswer('cell-plating', [200], ['cell-plating-input']));
            }
        },
        {
            id: "module3",
            title: "Module 3: Cellular Alchemy: The Art of Transfection",
            content: () => `
                <div class="module-content">
                    <h2>Module 3: Cellular Alchemy: The Art of Transfection</h2>
                    <p>Welcome to the fascinating world of transfection! In this module, you'll learn how to introduce foreign genetic material into cells, a cornerstone technique in molecular biology that allows us to study gene function, produce proteins, and much more. It's like giving cells a new set of instructions!</p>
                    
                    <h3>I. Module Overview & Learning Objectives</h3>
                    <p>This module will guide you through the principles and practical steps of transfecting eukaryotic cells, focusing on the calcium phosphate method.</p>
                    <ul class="list-disc list-inside mb-4 bg-sky-50 p-3 rounded-md">
                        <li>Understand the definition and goals of transfection.</li>
                        <li>Differentiate between transient and stable transfection.</li>
                        <li>Get an overview of various transfection methods and their applications.</li>
                        <li>Master the calcium phosphate transfection protocol for HEK293 cells.</li>
                        <li>Learn to calculate necessary reagent and plasmid amounts.</li>
                        <li>Identify key factors for successful transfection and basic troubleshooting.</li>
                    </ul>

                    <h3>II. Content Sections</h3>
                    
                    <h4 class="styled-h4">A. Introduction to Transfection</h4>
                    <p><strong>What is Transfection?</strong><br>
                    Transfection is a powerful biotechnological process used to introduce foreign nucleic acids – most commonly plasmid DNA – into eukaryotic cells. This allows scientists to manipulate the genetic makeup of cells in a controlled manner.</p>
                    
                    <p><strong>Goals of Transfection:</strong></p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                        <div class="goal-box"><strong>Gene Expression</strong><p class="text-sm">Introducing a gene to produce a specific protein (e.g., a fluorescent marker like GFP, or a therapeutic protein).</p></div>
                        <div class="goal-box"><strong>Gene Silencing/Knockdown</strong><p class="text-sm">Introducing constructs (like siRNA or shRNA) to reduce or eliminate the expression of a specific endogenous gene.</p></div>
                        <div class="goal-box"><strong>Reporter Assays</strong><p class="text-sm">Studying the activity of promoters or other regulatory elements by linking them to a reporter gene.</p></div>
                        <div class="goal-box"><strong>Protein Production</strong><p class="text-sm">Using cells as factories to produce large quantities of a desired protein.</p></div>
                    </div>
                    
                    <p><strong>Transient vs. Stable Transfection:</strong></p>
                    <ul class="list-disc list-inside ml-4">
                        <li><strong>Transient Transfection:</strong> The introduced nucleic acid (e.g., plasmid) enters the cell and is expressed for a limited period (typically 24-96 hours). It is not integrated into the host cell's genome and is eventually lost or diluted out as cells divide. This is useful for rapid gene expression studies.</li>
                        <li><strong>Stable Transfection:</strong> The introduced nucleic acid is integrated into the host cell's genome. This results in long-term, stable expression of the gene, which is passed on to daughter cells during cell division. Creating stable cell lines requires selection methods (e.g., using antibiotic resistance markers).</li>
                    </ul>
                   
                    <h4 class="styled-h4">B. Overview of Transfection Methods</h4>
                    <p>There are numerous ways to get nucleic acids into cells, broadly categorized as:</p>
                    <ul class="list-disc list-inside ml-4">
                        <li><strong>Chemical Methods:</strong> Using reagents like Calcium Phosphate, Lipids (Lipofection), or Cationic Polymers.</li>
                        <li><strong>Physical Methods:</strong> Using physical force, such as Electroporation or Microinjection.</li>
                        <li><strong>Viral Methods (Transduction):</strong> Using viruses as vectors to deliver genetic material.</li>
                    </ul>
                    <p>In this course, we will focus on the <strong>Calcium Phosphate Precipitation</strong> method.</p>
                    <div class="interactive-box">
                        <h4>Interactive Box 1: The Agony of Choice: Which Method for Which Purpose?</h4>
                        <p class="text-sm mb-2">Scenario: Imagine you want to express proteins quickly and cost-effectively in robust HEK293 cells. Which of the following methods would be most suitable for this project and our course?</p>
                        <div id="transfection-method-choice-quiz" class="space-y-1"></div>
                        <div id="transfection-method-choice-feedback" class="feedback-message text-xs mt-2 p-1.5 rounded-md hidden"></div>
                    </div>

                    <h4 class="styled-h4">C. In Detail: Calcium Phosphate Transfection</h4>
                    <p><strong>The Principle:</strong> Negatively charged plasmid DNA is mixed with calcium chloride (CaCl₂). When a phosphate-buffered solution (2x BBS) is added, insoluble calcium phosphate-DNA co-precipitates form. Cells naturally take up these particles through endocytosis.</p>
                    
                    <h4 class="styled-h4">The Protocol – Step by Step to Success:</h4>
                    <p class="text-sm italic">The following protocol is for transfecting <strong>one well</strong> of a 24-well plate.</p>
                    <div class="highlight-note"><p><strong>Crucial Reminder:</strong> Always prepare all solutions for the required number of wells PLUS 10% extra volume to account for pipetting errors!</p></div>

                    <ol class="list-decimal list-inside space-y-3">
                        <li><strong>Prepare Solution:</strong> In a sterile tube, add <strong>25 µL of 0.25 M CaCl₂</strong>, then add <strong>0.3 - 0.5 µg</strong> of your plasmid DNA.</li>
                        
                        <li>
                            <strong>Interactive Box 2: "Plasmid Calculation Wizards Wanted!"</strong>
                            <div class="interactive-box">
                                <h4>Plasmid Calculation Practice</h4>
                                <p class="text-sm mb-2"><strong>Scenario 1: Volume Calculation</strong><br>You want to use 0.4 µg of Plasmid pH2B-GFP. Its stock concentration is 682.3 ng/µL. How many µL of the stock solution do you need?</p>
                                <div class="calculator grid grid-cols-1 sm:grid-cols-2 gap-2 items-end mb-4">
                                    <div><label for="desired_mass_pg" class="block text-xs font-medium text-gray-700">Desired Mass (µg):</label><input type="number" id="desired_mass_pg" value="0.4" class="w-full mt-1 text-sm p-1"></div>
                                    <div><label for="stock_conc_pg" class="block text-xs font-medium text-gray-700">Stock Conc. (ng/µL):</label><input type="number" id="stock_conc_pg" value="682.3" class="w-full mt-1 text-sm p-1"></div>
                                    <div class="sm:col-span-2"><button id="plasmid-calc-btn" class="w-full py-1.5 text-sm">Calculate Volume</button></div>
                                </div>
                                <div id="plasmid-volume-result-container" class="p-2 bg-white rounded-md shadow text-sm hidden">
                                    <p id="plasmid-volume-result" class="font-semibold text-blue-700"></p>
                                </div>

                                <p class="text-sm mb-2 mt-4"><strong>Scenario 2: Handling Small Volumes</strong><br>The calculated volume from Scenario 1 is approximately 0.586 µL. Can this be pipetted accurately and directly with standard lab pipettes? (Select Yes or No)</p>
                                <div id="small-volume-quiz" class="space-y-1 mb-2">
                                    <button class="quiz-option text-xs sm:text-sm" data-correct="false">Yes, it's fine.</button>
                                    <button class="quiz-option text-xs sm:text-sm" data-correct="true">No, it's too small for accurate direct pipetting.</button>
                                </div>
                                <div id="small-volume-feedback" class="feedback-message text-xs mt-1 p-1.5 rounded-md hidden"></div>
                            </div>
                        </li>
                        
                        <li><strong>The Magic Ingredient:</strong> Slowly, while gently flicking the tube, add <strong>25 µL of 2x BBS</strong>.</li>
                        <li><strong>Mix Gently:</strong> Cap and invert 4-5 times. **DO NOT VORTEX**.</li>
                        <li><strong>Patience Test:</strong> Incubate for <strong>15 minutes at room temperature</strong> to allow precipitates to form.</li>
                        <li><strong>"Feed" the Cells:</strong> Gently resuspend and add the <strong>50 µL suspension dropwise</strong> to the cells in the well.</li>
                        <li><strong>Gentle Distribution:</strong> Swirl the plate gently in a "figure-eight" motion.</li>
                        <li><strong>Off to the Incubator:</strong> Place in the 37°C, 5% CO₂ incubator overnight (16-24 hours).</li>
                    </ol>

                    <h4 class="styled-h4">D. Important Tips & Troubleshooting Corner</h4>
                    <ul class="list-disc list-inside ml-4">
                        <li><strong>Cell Confluency:</strong> Aim for 50-70% confluency for optimal results.</li>
                        <li><strong>DNA Quality & Quantity:</strong> Use high-purity, endotoxin-free DNA.</li>
                        <li><strong>pH of BBS:</strong> This is CRITICAL. A pH between 7.05 and 7.12 is required for proper precipitate formation.</li>
                    </ul>
                    <div class="interactive-box">
                        <h4>Interactive Box 4: What Went Wrong? – Transfection Troubleshooting</h4>
                        <div id="transfection-troubleshooting-quiz"></div>
                    </div>
                </div>
            `,
            quiz: [
                {
                    question: "What is the primary purpose of adding 2x BBS in the calcium phosphate transfection method?",
                    options: ["To provide nutrients to the cells", "To permeabilize the cell membrane", "To form a DNA-calcium phosphate co-precipitate", "To select for transfected cells"],
                    answer: "To form a DNA-calcium phosphate co-precipitate",
                    type: "mcq",
                    explanation: "2x BBS (Buffered Saline Solution) provides the phosphate ions that react with calcium chloride and DNA to form the fine precipitate that cells can take up."
                },
                {
                    question: "True or False: For optimal calcium phosphate transfection, cells should ideally be 100% confluent.",
                    options: ["True", "False"],
                    answer: "False",
                    type: "tf",
                    explanation: "Cells should be actively dividing and typically at a confluency of 50-70% for efficient calcium phosphate transfection. 100% confluency often leads to lower efficiency."
                },
                {
                    question: "Which of the following is NOT a critical factor for successful calcium phosphate transfection?",
                    options: ["pH of the BBS solution", "Quality and quantity of plasmid DNA", "Vigorous vortexing after adding BBS", "Cell health and confluency"],
                    answer: "Vigorous vortexing after adding BBS",
                    type: "mcq",
                    explanation: "Vigorous vortexing after adding BBS can lead to large, irregular precipitates and shear DNA, reducing transfection efficiency. Gentle mixing by inversion is recommended."
                }
            ],
            init: () => {
                // Attach event listener for the plasmid volume calculator button
                document.getElementById('plasmid-calc-btn')?.addEventListener('click', calculatePlasmidVolume);
                
                // Initialize Interactive Box 1: Transfection Method Choice
                const methodChoiceContainer = document.getElementById('transfection-method-choice-quiz');
                const methodChoiceFeedback = document.getElementById('transfection-method-choice-feedback');
                if (methodChoiceContainer && methodChoiceFeedback) {
                    const methodQuizData = {
                        options: ["Lipofection (e.g., Lipofectamine)", "Electroporation", "Calcium Phosphate Precipitation", "Viral Transduction (e.g., with lentiviruses)"],
                        answer: "Calcium Phosphate Precipitation",
                        feedback_correct: "Exactly! The calcium phosphate method is an established, cost-effective method well-suited for transfecting adherent cells like HEK293.",
                        feedback_incorrect: "Not quite. While other methods are effective, CaPi is a great balance of cost and efficiency for this specific purpose."
                    };
                    methodChoiceContainer.innerHTML = '';
                    methodQuizData.options.forEach(optText => {
                        const optButton = document.createElement('button');
                        optButton.className = 'quiz-option text-xs sm:text-sm';
                        optButton.textContent = optText;
                        optButton.addEventListener('click', () => {
                            methodChoiceContainer.querySelectorAll('.quiz-option').forEach(btn => {
                                btn.disabled = true;
                                btn.classList.remove('correct', 'incorrect');
                            });
                            methodChoiceFeedback.classList.remove('hidden', 'bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700');
                            if (optText === methodQuizData.answer) {
                                optButton.classList.add('correct');
                                methodChoiceFeedback.innerHTML = `<strong>Correct!</strong> ${methodQuizData.feedback_correct}`;
                                methodChoiceFeedback.classList.add('bg-green-100', 'text-green-700');
                            } else {
                                optButton.classList.add('incorrect');
                                methodChoiceFeedback.innerHTML = `<strong>Not quite.</strong> ${methodQuizData.feedback_incorrect}`;
                                methodChoiceFeedback.classList.add('bg-red-100', 'text-red-700');
                                methodChoiceContainer.querySelector('.quiz-option').textContent === methodQuizData.answer
                            }
                            methodChoiceFeedback.classList.remove('hidden');
                        });
                        methodChoiceContainer.appendChild(optButton);
                    });
                }
                
                // Initialize Interactive Box 2: Small Volume Pipetting Quiz
                const smallVolumeQuizContainer = document.getElementById('small-volume-quiz');
                const smallVolumeFeedback = document.getElementById('small-volume-feedback');
                if (smallVolumeQuizContainer && smallVolumeFeedback) {
                    smallVolumeQuizContainer.querySelectorAll('.quiz-option').forEach(button => {
                        button.addEventListener('click', () => {
                            smallVolumeQuizContainer.querySelectorAll('.quiz-option').forEach(btn => {
                                btn.disabled = true;
                                btn.classList.remove('correct', 'incorrect');
                            });
                            smallVolumeFeedback.classList.remove('hidden', 'bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700');
                            const isCorrect = button.dataset.correct === 'true';
                            if (isCorrect) {
                                button.classList.add('correct');
                                smallVolumeFeedback.innerHTML = "<strong>Correct!</strong> 0.586 µL is generally too small to pipette accurately. A good strategy is to prepare a master mix or a working dilution.";
                                smallVolumeFeedback.classList.add('bg-green-100', 'text-green-700');
                            } else {
                                button.classList.add('incorrect');
                                smallVolumeFeedback.innerHTML = "<strong>Not quite.</strong> This volume is very prone to error with standard lab equipment.";
                                smallVolumeFeedback.classList.add('bg-red-100', 'text-red-700');
                                smallVolumeQuizContainer.querySelector('[data-correct="true"]').classList.add('correct');
                            }
                            smallVolumeFeedback.classList.remove('hidden');
                        });
                    });
                }

                // Initialize Interactive Box 4: Troubleshooting Quiz
                const troubleshootingContainer = document.getElementById('transfection-troubleshooting-quiz');
                if (troubleshootingContainer) {
                    const troubleshootingQuizData = [
                        {
                            question: "Your cells look very unhappy after transfection, and many have detached. What could be a primary reason related to the CaPi method?",
                            options: ["Too little DNA was used", "The precipitates were too fine or incubated for too short a time", "The pH of the BBS was too high, leading to coarse, toxic precipitates, or precipitates were left on cells too long", "Cells were not confluent enough"],
                            answer: "The pH of the BBS was too high, leading to coarse, toxic precipitates, or precipitates were left on cells too long",
                            explanation: "Coarse CaPi precipitates formed due to incorrect pH or overly long incubation with cells can be quite toxic, leading to cell stress and detachment."
                        },
                        {
                            question: "You see hardly any GFP-positive cells 24-48 hours post-transfection. Which is a common critical factor to check first for CaPi transfections?",
                            options: ["The incubator temperature was 36°C instead of 37°C", "The pH of the 2x BBS solution was incorrect", "You used 0.5 µg of DNA instead of 0.3 µg", "The cells were only 50% confluent"],
                            answer: "The pH of the 2x BBS solution was incorrect",
                            explanation: "The pH of the BBS is extremely critical for forming the right kind of fine precipitate for efficient uptake. Incorrect pH is a very common reason for CaPi transfection failure."
                        }
                    ];
                    troubleshootingContainer.innerHTML = ''; // Clear if re-initializing
                    troubleshootingQuizData.forEach((q, index) => {
                        const qDiv = document.createElement('div');
                        qDiv.className = 'quiz-question p-3 mb-2 bg-white rounded-md shadow-sm';
                        let optionsHtml = `<p class="font-medium mb-2 text-sm">${index + 1}. ${q.question}</p><div class="space-y-1">`;
                        q.options.forEach(optText => {
                            optionsHtml += `<button class="quiz-option text-xs">${optText}</button>`;
                        });
                        optionsHtml += `</div><div class="feedback-message text-xs mt-1 p-1 rounded-md hidden"></div>`;
                        qDiv.innerHTML = optionsHtml;
                        
                        // Add event listeners for this specific quiz
                        const optionButtons = qDiv.querySelectorAll('.quiz-option');
                        optionButtons.forEach(btn => {
                            btn.addEventListener('click', () => {
                                optionButtons.forEach(b => b.disabled = true);
                                const feedbackEl = qDiv.querySelector('.feedback-message');
                                feedbackEl.classList.remove('hidden', 'bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700');
                                if(btn.textContent === q.answer) {
                                    btn.classList.add('correct');
                                    feedbackEl.innerHTML = `<strong>Correct!</strong> ${q.explanation}`;
                                    feedbackEl.classList.add('bg-green-100', 'text-green-700');
                                } else {
                                    btn.classList.add('incorrect');
                                    feedbackEl.innerHTML = `<strong>Incorrect.</strong> ${q.explanation}`;
                                    feedbackEl.classList.add('bg-red-100', 'text-red-700');
                                    optionButtons.forEach(opt => { if(opt.textContent === q.answer) opt.classList.add('correct'); });
                                }
                                feedbackEl.classList.remove('hidden');
                            });
                        });
                        troubleshootingContainer.appendChild(qDiv);
                    });
                }
            }
        }
    ];

    // =================================================================================
    // SECTION 2: HELPER & CALCULATOR FUNCTIONS
    // These functions perform specific tasks like calculations or checking answers.
    // They are called by event listeners set up in the `init` functions.
    // =================================================================================

    /**
     * Converts a value from milliliters to microliters.
     */
    function convertUnits() {
        const mlInput = document.getElementById('ml-input');
        const outputP = document.getElementById('ul-output');
        if (!mlInput || !outputP) return;

        const mlVal = parseFloat(mlInput.value);
        if (!isNaN(mlVal)) {
            outputP.innerHTML = `${mlVal} mL = <span class="font-bold">${mlVal * 1000} &mu;L</span>`;
            outputP.className = 'mt-2 text-sm font-medium text-blue-700';
        } else {
            outputP.textContent = 'Please enter a valid number for mL.';
            outputP.className = 'mt-2 text-sm font-medium text-red-600';
        }
    }

    /**
     * Calculates the missing value in a C1V1 = C2V2 dilution equation.
     */
    function calculateDilution() {
        const c1El = document.getElementById('c1_calc');
        const v1El = document.getElementById('v1_calc');
        const c2El = document.getElementById('c2_calc');
        const v2El = document.getElementById('v2_calc');
        const resultP = document.getElementById('dilution-result');
        const stepsP = document.getElementById('dilution-steps');
        const resultContainer = document.getElementById('dilution-result-container');
        const concUnits = document.getElementById('calc_units_conc').value;
        const volUnits = document.getElementById('calc_units_vol').value;

        if (!c1El || !v1El || !c2El || !v2El || !resultP || !stepsP || !resultContainer) return;

        const c1 = parseFloat(c1El.value);
        const v1 = parseFloat(v1El.value);
        const c2 = parseFloat(c2El.value);
        const v2 = parseFloat(v2El.value);
        
        let missingCount = [c1, v1, c2, v2].filter(v => isNaN(v)).length;

        resultContainer.classList.remove('hidden');
        if (missingCount !== 1) {
            resultP.textContent = "Error: Please provide exactly 3 values.";
            resultP.className = "font-semibold text-red-600";
            stepsP.innerHTML = "";
            return;
        }

        let calculatedValueStr = "";
        let calculationStepsStr = "";

        if (isNaN(v1)) {
            if (c1 === 0) { resultP.textContent = "Error: Stock Concentration (C1) cannot be zero."; return; }
            const calc_v1_val = (c2 * v2) / c1;
            calculatedValueStr = `Calculated Stock Volume (V<sub>1</sub>) = <strong>${calc_v1_val.toFixed(3)} ${volUnits}</strong>`;
            calculationStepsStr = `You need ${calc_v1_val.toFixed(3)} ${volUnits} of stock and ${(v2 - calc_v1_val).toFixed(3)} ${volUnits} of diluent.`;
        } else if (isNaN(c2)) {
            if (v2 === 0) { resultP.textContent = "Error: Final Volume (V2) cannot be zero."; return; }
            const calc_c2_val = (c1 * v1) / v2;
            calculatedValueStr = `Calculated Final Concentration (C<sub>2</sub>) = <strong>${calc_c2_val.toFixed(3)} ${concUnits}</strong>`;
        } // Add other cases (calculating C1, V2) as needed...

        resultP.innerHTML = calculatedValueStr;
        resultP.className = "font-semibold text-blue-700";
        stepsP.innerHTML = calculationStepsStr;
    }

    /**
     * Calculates cell density from hemocytometer counts.
     */
    function calculateCellDensity() {
        const cellsCounted = parseInt(document.getElementById('cells-counted').value);
        const dilutionFactor = parseFloat(document.getElementById('dilution-factor').value);
        const outputP = document.getElementById('cell-density-output');
        if (!outputP) return;

        if (isNaN(cellsCounted) || isNaN(dilutionFactor) || cellsCounted < 0 || dilutionFactor <= 0) {
            outputP.textContent = "Please enter valid, positive numbers.";
            outputP.className = "mt-3 font-semibold text-red-600";
            return;
        }
        const avgCellsPerSquare = cellsCounted / 4;
        const cellsPerMilliLiter = avgCellsPerSquare * dilutionFactor * 10000;
        outputP.innerHTML = `Calculated Cell Density: <strong>${cellsPerMilliLiter.toExponential(2)} cells/mL</strong>`;
        outputP.className = "mt-3 font-semibold text-green-700";
    }

    /**
     * Checks answers for practice problems with one or more input fields.
     */
    function checkPracticeAnswer(problemId, correctAnswers, inputIds) {
        const feedbackDiv = document.getElementById(`${problemId}-feedback`);
        const solutionDiv = document.getElementById(`${problemId}-solution`);
        const inputElements = inputIds.map(id => document.getElementById(id));
        if (!feedbackDiv || !solutionDiv || inputElements.some(el => !el)) return;

        let allCorrect = true;
        inputElements.forEach((inputEl, index) => {
            const userAnswer = parseFloat(inputEl.value);
            inputEl.classList.remove('correct-answer', 'incorrect-answer');
            if (Math.abs(userAnswer - correctAnswers[index]) > 0.011) { // Allow for small rounding differences
                allCorrect = false;
                inputEl.classList.add('incorrect-answer');
            } else {
                inputEl.classList.add('correct-answer');
            }
        });

        feedbackDiv.classList.remove('hidden');
        solutionDiv.classList.remove('hidden');
        if (allCorrect) {
            feedbackDiv.textContent = 'Correct!';
            feedbackDiv.className = 'practice-feedback text-sm mt-2 text-green-600';
        } else {
            feedbackDiv.innerHTML = 'One or more answers are incorrect. Please review the solution below.';
            feedbackDiv.className = 'practice-feedback text-sm mt-2 text-red-600';
        }
    }
    
    /**
     * Calculates required plasmid volume for transfection.
     */
    function calculatePlasmidVolume() {
        const desiredMassUg = parseFloat(document.getElementById('desired_mass_pg').value);
        const stockConcNgUl = parseFloat(document.getElementById('stock_conc_pg').value);
        const resultContainerEl = document.getElementById('plasmid-volume-result-container');
        const resultEl = document.getElementById('plasmid-volume-result');
        if (!resultContainerEl || !resultEl) return;
        
        resultContainerEl.classList.remove('hidden');
        if (isNaN(desiredMassUg) || isNaN(stockConcNgUl) || desiredMassUg <= 0 || stockConcNgUl <= 0) {
            resultEl.innerHTML = "<span class='text-red-600'>Please enter valid positive numbers.</span>";
            return;
        }
        const volumeUl = (desiredMassUg * 1000) / stockConcNgUl;
        resultEl.innerHTML = `Required Volume: <strong>${volumeUl.toFixed(3)} &micro;L</strong>`;
    }


    // =================================================================================
    // SECTION 3: CORE UI LOGIC
    // These functions manage the overall application state, like rendering content and quizzes.
    // =================================================================================
    
    /**
     * Populates the sidebar with links based on the modulesData array.
     */
    function populateSidebar() {
        if (!sidebar) return;
        modulesData.forEach(module => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = module.title;
            link.className = 'block py-2.5 px-4 rounded sidebar-link text-slate-200 hover:bg-slate-600 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors duration-150 text-sm';
            link.dataset.moduleId = module.id;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                loadModule(module.id);
            });
            sidebar.appendChild(link);
        });
    }

    /**
     * Renders the end-of-module quiz in a specified container.
     */
    function renderQuiz(quizData, containerId) {
        const quizContainer = document.getElementById(containerId);
        if (!quizContainer) return;
        quizContainer.innerHTML = '';

        quizData.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'quiz-question';
            let optionsHtml = q.options.map(optionText => `<button class="quiz-option">${optionText}</button>`).join('');

            questionDiv.innerHTML = `
                <p class="font-medium mb-3">${index + 1}. ${q.question}</p>
                <div class="space-y-2">${optionsHtml}</div>
                <div class="feedback-message text-sm mt-2 p-2 rounded-md hidden"></div>
            `;
            quizContainer.appendChild(questionDiv);

            // Add event listeners to the newly created option buttons
            const optionButtons = questionDiv.querySelectorAll('.quiz-option');
            optionButtons.forEach(button => {
                button.addEventListener('click', () => {
                    optionButtons.forEach(btn => btn.disabled = true);
                    const feedbackDiv = questionDiv.querySelector('.feedback-message');
                    feedbackDiv.classList.remove('hidden', 'bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700');
                    
                    if (button.textContent === q.answer) {
                        button.classList.add('correct');
                        feedbackDiv.innerHTML = '<strong>Correct!</strong> ';
                        feedbackDiv.classList.add('bg-green-100', 'text-green-700');
                    } else {
                        button.classList.add('incorrect');
                        feedbackDiv.innerHTML = `<strong>Incorrect.</strong> The correct answer is: <span class="font-semibold">${q.answer}</span>. `;
                        feedbackDiv.classList.add('bg-red-100', 'text-red-700');
                        optionButtons.forEach(btn => { if (btn.textContent === q.answer) btn.classList.add('correct'); });
                    }
                    if (q.explanation) {
                        feedbackDiv.innerHTML += `<br><span class="text-xs">${q.explanation}</span>`;
                    }
                    feedbackDiv.classList.remove('hidden');
                });
            });
        });
    }
    
    /**
     * Loads a module's content and quiz into the main content area.
     */
    function loadModule(moduleId) {
        const moduleData = modulesData.find(m => m.id === moduleId);
        if (!moduleData || !mainContent) return;

        welcomeMessage.style.display = 'none';
        mainContent.innerHTML = moduleData.content();

        if (moduleData.quiz && moduleData.quiz.length > 0) {
            const quizHtml = `
                <div class="mt-8 pt-6 border-t-2 border-blue-300">
                    <h3 class="text-xl font-semibold text-blue-700 mb-4">Module Quiz!</h3>
                    <div id="quiz-container-${moduleId}"></div>
                </div>`;
            mainContent.insertAdjacentHTML('beforeend', quizHtml);
            renderQuiz(moduleData.quiz, `quiz-container-${moduleId}`);
        }

        // Run the module's specific initialization script for interactivity
        if (typeof moduleData.init === 'function') {
            try {
                moduleData.init();
            } catch (error) {
                console.error(`Error initializing module ${moduleId}:`, error);
            }
        }

        // Update active link in the sidebar
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.classList.remove('active', 'bg-slate-700', 'text-yellow-400');
            if (link.dataset.moduleId === moduleId) {
                link.classList.add('active', 'bg-slate-700', 'text-yellow-400');
            }
        });
    }

    // =================================================================================
    // SECTION 4: APPLICATION INITIALIZATION
    // This code runs once when the page is loaded.
    // =================================================================================

    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const welcomeMessage = document.getElementById('welcome-message');
    
    populateSidebar();
    welcomeMessage.style.display = 'block';

});
