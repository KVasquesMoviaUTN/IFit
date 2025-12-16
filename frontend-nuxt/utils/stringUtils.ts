/**
 * Normalizes a string by removing accents and converting to lowercase.
 * @param {string} str - The string to normalize.
 * @returns {string} The normalized string.
 */
export const normalizeString = (str) => {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

/**
 * Calculates the Levenshtein distance between two strings.
 * @param {string} a - The first string.
 * @param {string} b - The second string.
 * @returns {number} The Levenshtein distance.
 */
export const levenshteinDistance = (a, b) => {
	if (a.length === 0) return b.length;
	if (b.length === 0) return a.length;

	const matrix = [];

	// increment along the first column of each row
	for (let i = 0; i <= b.length; i++) {
		matrix[i] = [i];
	}

	// increment each column in the first row
	for (let j = 0; j <= a.length; j++) {
		matrix[0][j] = j;
	}

	// Fill in the rest of the matrix
	for (let i = 1; i <= b.length; i++) {
		for (let j = 1; j <= a.length; j++) {
			if (b.charAt(i - 1) === a.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(
					matrix[i - 1][j - 1] + 1, // substitution
					Math.min(
						matrix[i][j - 1] + 1, // insertion
						matrix[i - 1][j] + 1 // deletion
					)
				);
			}
		}
	}

	return matrix[b.length][a.length];
};

/**
 * Checks if a text matches a query using fuzzy logic.
 * @param {string} text - The text to search in.
 * @param {string} query - The search query.
 * @param {number} threshold - The maximum allowed distance (default 2).
 * @returns {boolean} True if match found.
 */
export const fuzzyMatch = (text, query, threshold = 2) => {
	const normalizedText = normalizeString(text);
	const normalizedQuery = normalizeString(query);

	if (normalizedText.includes(normalizedQuery)) return true;

	// Split text into words to check against query
	const words = normalizedText.split(/\s+/);
	for (const word of words) {
		if (levenshteinDistance(word, normalizedQuery) <= threshold) {
			return true;
		}
	}

	return false;
};
