{
  description = "Party Wizard flake env";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

outputs = { self, nixpkgs }:
    let
      system =  "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
      name = "PARTY WIZARD";

    in {
      devShells.${system}.default = pkgs.mkShell{
        packages = with pkgs; [
          bmake
          python3
        ];
        shellHook = ''
          echo "Enter to '${name}' env :)"
          source env/bin/activate
          echo "Upgrade pip and install packages..."
          pip install --upgrade pip
          pip install -r PARTY/backend/requirements.txt
          which python
          echo "Env activated"
          exec fish
        '';
      };
    };
}
