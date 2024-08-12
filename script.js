// Fetch the JSON data
fetch("providers.json")
    .then((response) => response.json())
    .then((providers) => {
        document.querySelector(".submit_btn").addEventListener("click", () => {
            // Capture user input
            const length = parseFloat(document.getElementById("length").value);
            const width = parseFloat(document.getElementById("width").value);
            const height = parseFloat(document.getElementById("height").value);
            const weight = parseFloat(document.getElementById("weight").value);

            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = ""; // Clear previous results

            if (
                isNaN(length) ||
                isNaN(width) ||
                isNaN(height) ||
                isNaN(weight)
            ) {
                resultDiv.innerHTML =
                    '<p style="color: red;">Please enter valid numbers for all dimensions and weight.</p>';
                return;
            }

            let bestOption = null;

            // Loop through each provider
            for (let provider in providers) {
                providers[provider].forEach((option) => {
                    if (
                        length <= option.length &&
                        width <= option.width &&
                        height <= option.height &&
                        weight <= option.maxWeight
                    ) {
                        if (
                            bestOption === null ||
                            option.price < bestOption.price
                        ) {
                            bestOption = {
                                provider: provider,
                                name: option.name,
                                price: option.price,
                                link: option.link,
                            };
                        }
                    }
                });
            }

            if (bestOption) {
                resultDiv.innerHTML = `
                    <h2>Best Option:</h2>
                    <p><strong>Provider:</strong> ${bestOption.provider.toUpperCase()}</p>
                    <p><strong>Size:</strong> ${bestOption.name}</p>
                    <p><strong>Price:</strong> €${bestOption.price.toFixed(
                        2
                    )}</p>
                    <p><a href="${
                        bestOption.link
                    }" target="_blank">Order Here</a></p>
                `;
            } else {
                resultDiv.innerHTML =
                    "<p>No suitable options found for the given dimensions and weight.</p>";
            }
        });
    })
    .catch((error) => console.error("Error fetching providers:", error));
