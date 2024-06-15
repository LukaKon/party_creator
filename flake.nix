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
          nodejs_22

          python3
          python311Packages.python-lsp-server
          python311Packages.flake8
          python311Packages.autopep8
          python311Packages.isort
          python311Packages.markdown
          python311Packages.bpython
        ];

        shellHook = ''
          echo "Enter to '${name}' env :)"
          source env/bin/activate
          echo "Upgrade pip and install packages..."
          pip install --upgrade pip
          pip install -r PARTY/backend/requirements.txt
          echo Python version:
          which python
          echo "Env activated"
          # exec fish
        '';
      };
    };
}
